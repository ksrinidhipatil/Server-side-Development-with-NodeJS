var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var verify = require('./verify');
var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(verify.verifyOrdinaryUser,function (req,res,next) {
    var userId = req.decoded._id;
    Favorites.find({'postedBy': userId})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err,favortes) {
            if(err) next(err);
            res.json(favortes);
        });
})
.post(verify.verifyOrdinaryUser, function (req,res,next) {
    var userId = req.decoded._id;
    var dishId = req.body._id;
    Favorites.update({postedBy: userId }
    ,{$push:{dishes:dishId}},
        {upsert:true},
    function (err,data) {
        if (err) next(err);
        res.json(data);
    })
})
.delete(verify.verifyOrdinaryUser,function (req,res,next) {
    var userId = req.decoded._id;
    var dishId = req.body._id;
    Favorites.remoove({posteBY:userId},function (err,resp) {
        if(err) next(err)
        res.json(resp)
    })
})
favoriteRouter.route('/:dishId')
.delete(verify.verifyOrdinaryUser,function (req,res,next) {
    Favorites.findByIdAndRemove(req.params.dishId,function (err,resp) {
        if (err) next(err);
        res.json(resp)
    })
})

module.exports = favoriteRouter;
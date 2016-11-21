var express = require('express');
var bodyParser = require('body-parser');
var Leadership = require('../models/leadership');
var mongoose = require('mongoose');
var verify = require('./verify');

    var leaderRouter = express.Router();

    leaderRouter.use(bodyParser.json());

    leaderRouter.route('/')
        .get(function (req, res, next) {
            Leadership.find(req.query, function (err, leader) {
                if (err) next(err);
                res.json(leader);
            });
        })

        .post(verify.verifyOrdinaryUser,verify.verifyAdmin,function (req, res, next) {
            Leadership.create(req.body, function (err, leader) {
                if (err) next(err);
                console.log('leader created!');
                var id = leader._id;

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Added the leader with id: ' + id);
            });
        })

        .delete(verify.verifyOrdinaryUser,verify.verifyAdmin,function (req, res, next) {
            Leadership.remove({}, function (err, resp) {
                if (err) next(err);
                res.json(resp);
            });
        });

leaderRouter.route('/:leaderId')
    .get(verify.verifyOrdinaryUser,function (req, res, next) {
        Leadership.findById(req.params.leaderId, function (err, leader) {
             if (err) next(err);;
            res.json(leader);
        });
    })

    .put(verify.verifyOrdinaryUser,verify.verifyAdmin,function (req, res, next) {
        Leadership.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {
            new: true
        }, function (err, leader) {
             if (err) next(err);;
            res.json(leader);
        });
    })

    .delete(verify.verifyOrdinaryUser,verify.verifyAdmin,function (req, res, next) {
        Leadership.findByIdAndRemove(req.params.leaderId, function (err, resp) {
             if (err) next(err);;
            res.json(resp);
        });
    });

    module.exports =  leaderRouter;

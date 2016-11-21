var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var FavoritesSchema = new Schema({
    postedBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes:[{

                type:mongoose.Schema.Types.ObjectId,
                ref:'Dish'

    }]},
{
    timestamps: true
});

var Favorites = mongoose.model('Favorite',FavoritesSchema);
module.exports = Favorites;
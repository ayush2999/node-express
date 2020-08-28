const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
    id: {
        type: String,
        required: true
        // unique: true
    },
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }}
    , {
    timestamps: true
});


const Image = new Schema({
    imagePath:[imageSchema]
}, {
    timestamps: true
});

var imagePath = mongoose.model('imagePackage', Image);

module.exports = imagePath;

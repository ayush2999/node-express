const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ProductConstituentSchema = new Schema({
    name: {
        type: String,
        required: true
        // unique: true
    },
    test: {
        type: String,
        required: true
    }},{
    timestamps: true
});

const comboPackageSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    ProductConstituent:[ProductConstituentSchema],
    Prerequisite: {
        type: String,
        required: true
    },
    ReportAvailability: {
        type: String,
        required: true
    },
    UsefulFor: {
        type: String,
        required: true
    }},
    {
    timestamps: true
})

const ComboSchema = new Schema({
    comboPackage:[comboPackageSchema]
}, {
    timestamps: true
});

var ComboPackages = mongoose.model('ComboPackage', ComboSchema);

module.exports = ComboPackages;


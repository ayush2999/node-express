const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

var authenticate = require('../authenticate');

const images = require('../models/imagePath');

const imagePathRouter = express.Router();

imagePathRouter.use(bodyParser.json());

imagePathRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    images.find({})
    .then((images) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(images);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    images.create(req.body)
    .then((imagePath) => {
        console.log('imagePath Created ', imagePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(imagePath);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /images');
})
.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    images.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

imagePathRouter.route('/:imagePathId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    images.findById(req.params.imagePathId)
    .then((imagePath) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(imagePath);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /images/'+ req.params.imagePathId);
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    images.findByIdAndUpdate(req.params.imagePathId, {
        $set: req.body
    }, { new: true })
    .then((imagePath) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(imagePath);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    images.findByIdAndRemove(req.params.imagePathId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = imagePathRouter;


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

var authenticate = require('../authenticate');

const combos = require('../models/combos');

const comboRouter = express.Router();

comboRouter.use(bodyParser.json());

comboRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    res.status=200;
    res.end("fetch combos")
    // combos.find({})
    // .then((combos) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(combos);
    // }, (err) => next(err))
    // .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    combos.create(req.body)
    .then((combo) => {
        console.log('combo Created ', combo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(combo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /combos');
})
.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    combos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

comboRouter.route('/:comboId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    combos.findById(req.params.comboId)
    .then((combo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(combo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /combos/'+ req.params.comboId);
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    combos.findByIdAndUpdate(req.params.comboId, {
        $set: req.body
    }, { new: true })
    .then((combo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(combo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    combos.findByIdAndRemove(req.params.comboId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = comboRouter;


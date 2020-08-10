const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

var authenticate = require('../authenticate');

const lifeCycles = require('../models/lifeCycle');

const lifeCycleRouter = express.Router();

lifeCycleRouter.use(bodyParser.json());

lifeCycleRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    lifeCycles.find({})
    .then((lifeCycles) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lifeCycles);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    lifeCycles.create(req.body)
    .then((lifeCycle) => {
        console.log('lifeCycle Created ', lifeCycle);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lifeCycle);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /lifeCycles');
})
.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    lifeCycles.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

lifeCycleRouter.route('/:lifeCycleId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    lifeCycles.findById(req.params.lifeCycleId)
    .then((lifeCycle) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lifeCycle);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /lifeCycles/'+ req.params.lifeCycleId);
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    lifeCycles.findByIdAndUpdate(req.params.lifeCycleId, {
        $set: req.body
    }, { new: true })
    .then((lifeCycle) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lifeCycle);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    lifeCycles.findByIdAndRemove(req.params.lifeCycleId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = lifeCycleRouter;


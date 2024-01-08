const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();});

const apiController = require('../controllers/apiController');

router.use(express.json());

router.get('/user', apiController.getData);

router.post('/', apiController.postUser);

router.put('/', apiController.putCounter)

module.exports = router;
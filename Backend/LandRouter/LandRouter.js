const express = require('express');
const router = express.Router();

const {
    postLandData,
    getLandData,
    postToolData,
    postSignin,
    checkLogin
} = require('../LandRouterController/HomeController');

const upload = require('../MiddleWare/upload');

router.post('/signIn',postSignin)

router.post('/login',checkLogin)

router.post('/', upload.single('HouseImage'), postLandData);

router.post('/tool',postToolData)


router.get('/', getLandData);

module.exports = router;

const express = require('express');
const router = express.Router();
const { isAuth } = require('../middlewares/authenticate');
const { handleSendOffer } = require('../controllers/offer.controller');

router.post('/send-offer', isAuth, handleSendOffer);

module.exports = router;
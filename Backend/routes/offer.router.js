import express from 'express';
import { isAuth } from '../middlewares/authenticate.js';
import { handleSendOffer } from '../controllers/offer.controller.js';

const router = express.Router();

router.post('/send-offer', isAuth, handleSendOffer);

export default router;
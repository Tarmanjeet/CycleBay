import { sendOfferEmail } from '../services/offer.service.js';

export const handleSendOffer = async (req, res) => {
  const { sellerEmail, buyerName, productName } = req.body;

  if (!sellerEmail || !buyerName || !productName) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    await sendOfferEmail(sellerEmail, buyerName, productName);
    return res.json({ success: true, message: 'Offer email sent successfully' });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};
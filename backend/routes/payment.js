
const express = require('express');
const router = express.Router();
const paymentController = require("./../controller/paymentController.js")
//const oauth = require("../services/oauthCheck");

// hämtar kontot med hjälp av id
router.get('/:id', paymentController.getAccountController);
router.post('/:id', paymentController.executePaymentController);
router.post('/add/account', paymentController.addAccountController);
router.put('/', paymentController.addMoneyToAccountController);

module.exports = router;
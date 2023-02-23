
const express = require('express');
const router = express.Router();
const paymentController = require("./../controller/paymentController.js")
const oauth = require("../services/oauthCheck");

// Hämtar kontot med hjälp av id
router.get('/', oauth.oauthCheck, paymentController.getAccountController);
// Betalar allt - user_id
router.post('/', oauth.oauthCheck, paymentController.executePaymentController);
// Lägger till ett konto - user_id, account
router.post('/add/account', oauth.oauthCheck, paymentController.addAccountController);
// Insättning av pengar - user_id, summa
router.put('/', oauth.oauthCheck, paymentController.addMoneyToAccountController);
// Val vid automatisk betalning eller inte - user_id, true/false   
router.put('/monthly-payment', oauth.oauthCheck, paymentController.handleMonthlyPaymentController);

module.exports = router;
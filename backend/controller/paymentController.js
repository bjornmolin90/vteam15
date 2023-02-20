const payment = require("./../services/paymentService.js");

const getAccountController = async function (req, res, next) {
    let id = req.user.user_id;
    try {
        let result = await payment.getAccount(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json("error");
    }
}

const addAccountController = async function (req, res, next) {

    let { account } = req.body;
    let user_id = req.user.user_id;

    try {
        // Lägg till konto
        await payment.addAccount(user_id, account);
        res.status(200).json("success");
    } catch (error) {
        res.status(401).json("error");
    }
}

const addMoneyToAccountController = async function (req, res, next) {
    try {
        let { balance } = req.body;
        let user_id = req.user.user_id;
        let result = await payment.addMoneyToAccount(user_id, balance);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json("error");
    }
}


const executePaymentController = async function (req, res, next) {
    try {
        // Betala faktura.
        let user_id = req.user.user_id;
        let result = await payment.executePayment(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json("error");
    }
}


const handleMonthlyPaymentController = async function (req, res, next) {
    let { monthlyPayment } = req.body;
    let user_id = req.user.user_id;
    try {
        // ändra kontots månatliga transaktion till true eller false 
        await payment.handleMonthlyPayment(user_id, monthlyPayment);
        res.status(200).json("success");
    } catch (error) {
        res.status(401).json("error");
    }
}


module.exports = { addMoneyToAccountController, executePaymentController, addAccountController, getAccountController, handleMonthlyPaymentController }
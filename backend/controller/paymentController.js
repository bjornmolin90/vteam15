const payment = require("./../services/paymentService.js");

const getAccountController = async function (req, res, next) {
    let id = req.params.id;
    try {
        let result = await payment.getAccount(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json("error");
    }
}

const addAccountController = async function (req, res, next) {

    let { user_id, account } = req.body;
    console.log(user_id);

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
        let {user_id, balance} = req.body;
        let result = await payment.addMoneyToAccount(user_id, balance);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json("error");
    }
}


const executePaymentController = async function (req, res, next) {
    try {
        // ändra kontots månatliga transaktion till true eller false
        console.log("ss");
        let user_id = req.params.id;
        let result = await payment.executePayment(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json("error");
    }
}


const handleMonthlyPaymentController = async function (req, res, next) {

    let { id, monthlyPayment } = req.body;

    try {
        // kolla först om användaren har ett konto

        // ändra kontots månatliga transaktion till true eller false 
        await payment.handleMonthlyPayment(id, monthlyPayment);
        res.status(200).json("success");
    } catch (error) {
        res.status(401).json("error");
    }
}


module.exports = { addMoneyToAccountController, executePaymentController, addAccountController, getAccountController, handleMonthlyPaymentController }
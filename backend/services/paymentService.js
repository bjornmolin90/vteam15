const paymentModels = require("../models/payment")

// Hämta ett konto
async function getAccount(user_id) {
    // Koden för att lägga till konto här.
    try {
        return await paymentModels.getAccount(user_id)
    } catch (error) {
        return error;
    }
}

async function addAccount(user_id, account) {
    // Koden för att lägga till konto här.
    try {
        await paymentModels.addAccount(user_id, account)
    } catch (error) {
        return error;
    }
}

async function addMoneyToAccount(user_id, balance) {
    // Koden för att lägga till konto här.
    try {
        await paymentModels.addMoneyToAccount(user_id, balance)
    } catch (error) {
        return error;
    }
}

async function executePayment(user_id) {
    // Koden för att hantera månatlig betalning här.
    try {
        return await paymentModels.executePayment(user_id)
    } catch (error) {
        return error;
    }
}

// Definiera en funktion som hanterar månatlig betalning
async function handleMonthlyPayment() {
    // Koden för att hantera månatlig betalning här.
    try {
        await paymentModels.handleMonthlyPayment()
    } catch (error) {
        return error;
    }
}

module.exports = { addMoneyToAccount, getAccount, handleMonthlyPayment, addAccount, executePayment }
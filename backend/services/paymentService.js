const paymentModels = require("../models/payment")
const cron = require('node-cron');
const cronJobs = {};

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
async function handleMonthlyPayment(user_id, monthlyPayment) {
    // Koden för att hantera månatlig betalning här.
    try {
        if (monthlyPayment) {
            await paymentModels.handleMonthlyPayment(user_id, monthlyPayment)
            cronJobs[user_id] = cron.schedule('* * * * *', async () => {
                console.log('CronJob 1 körs varje minut!');
                console.log(user_id);
                await paymentModels.addMoneyAndPayAuto(user_id)
            })
            return "Done"
        }
        // Stoppa cronJob med ID "job1"
        await paymentModels.handleMonthlyPayment(user_id, monthlyPayment)
        cronJobs[user_id].stop();
        //await paymentModels.handleMonthlyPayment(user_id, monthlyPayment)
    } catch (error) {
        return error;
    }
}

module.exports = { addMoneyToAccount, getAccount, handleMonthlyPayment, addAccount, executePayment }
let db = require('../config/db')

// Hämta kontot
async function getAccount(user_id) {
    let sql = `SELECT * FROM accounts WHERE user_id = ${user_id};`;
    let result = await db.connection.promise().query(sql)
    return result[0];
}
// monthly_transaction innehåller 0 eller 1, där 0=false och 1=true, default är satt på 1 i databasen.
async function handleMonthlyPayment(user_id, monthly_transaction) {
    // Koden för att hantera månatlig betalning här.
    let mTransaction = monthly_transaction ? 1 : 0;
    let sql = `UPDATE accounts SET monthly_transaction = ${mTransaction} WHERE user_id = ${user_id};`
    await db.connection.promise().query(sql)
}

async function addAccount(user_id, account) {
    // Kollar om user har ett konto.
    let sql = `
    SELECT COUNT(*) AS account_count
    FROM accounts
    WHERE user_id = ${user_id};`
    let result = await db.connection.promise().query(sql)
    // Finns det redan ett konto så skapas inget nytt.
    if (result[0][0].account_count >= 1) {
        return "Finns redan ett konto"
    }
    // Här skapas ett konto
    sql = `
    INSERT INTO accounts(user_id, card_number, csv)
    VALUES(${user_id}, '${account.card_number}', '${account.csv}');`;
    await db.connection.promise().query(sql)
}

async function addMoneyAndPayAuto(user_id) {
    // Lägger ihop alla kostnader för alla cykelturer.
    let sql = `SELECT SUM(cost) AS Kostnad FROM bike_rides WHERE user_id = ${user_id} AND status = 'unpaid';`
    let result = await db.connection.promise().query(sql);
    // Finns det kostnader så händer inget.
    if (result[0][0].Kostnad === null) {
        return "inget att betala";
    }
    // kollar om man har ett konto och tillräckligt med pengar i det.
    sql = `SELECT u.user_id, a.balance
            FROM users u
            INNER JOIN accounts a ON u.user_id = a.user_id
            WHERE u.user_id = ${user_id} AND a.balance >= ${result[0][0].Kostnad};`

    let result2 = await db.connection.promise().query(sql);
    // Är resultatet 0, för lite pengar eller inget konto.
    if (result2[0].length == 0) {
        await addMoneyToAccount(user_id, result[0][0].Kostnad)
    }
 
    // Här uppdaterar man statusen till betald och därefter dras pengar från kontot.
    sql = `
    START TRANSACTION;

    UPDATE bike_rides
    SET status = 'paid'
    WHERE user_id = ${user_id};
    
    UPDATE accounts
    SET balance = balance - ${result[0][0].Kostnad}
    WHERE user_id = ${user_id};

    COMMIT;`
    await db.connection.promise().query(sql);
    return "betalningen genomförd";
}

async function addMoneyToAccount(user_id, balance) {
    // Insättning av pengar.
    let sql = `
    UPDATE accounts
    SET balance = balance + ${balance}
    WHERE user_id = ${user_id};`;
    await db.connection.promise().query(sql)
}

async function executePayment(user_id) {
    // Lägger ihop alla kostnader för alla cykelturer.
    let sql = `SELECT SUM(cost) AS Kostnad FROM bike_rides WHERE user_id = ${user_id} AND status = 'unpaid';`
    let result = await db.connection.promise().query(sql);
    // Finns det kostnader så händer inget.
    if (result[0][0].Kostnad === null) {
        return "inget att betala";
    }
    // kollar om man har ett konto och tillräckligt med pengar i det.
    sql = `SELECT u.user_id, a.balance
            FROM users u
            INNER JOIN accounts a ON u.user_id = a.user_id
            WHERE u.user_id = ${user_id} AND a.balance >= ${result[0][0].Kostnad};`
    
    let result2 = await db.connection.promise().query(sql);
    // Är resultatet 0, för lite pengar eller inget konto.
    if (result2[0].length == 0) {
        return "för lite pengar eller inget konto"
    }
    // Här uppdaterar man statusen till betald och därefter dras pengar från kontot.
    sql = `
    START TRANSACTION;

    UPDATE bike_rides
    SET status = 'paid'
    WHERE user_id = ${user_id};
    
    UPDATE accounts
    SET balance = balance - ${ result[0][0].Kostnad }
    WHERE user_id = ${ user_id };

    COMMIT;`
    await db.connection.promise().query(sql);
    return "betalningen genomförd";
}


module.exports = { addMoneyAndPayAuto, addMoneyToAccount, getAccount, handleMonthlyPayment, addAccount, executePayment }
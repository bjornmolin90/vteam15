const express = require("express");
const app = express();
const cors = require('cors');
const port = 1337;
app.use(cors());

const mysql  = require("promise-mysql");
const config = require("./config.json");
let db;

(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

app.get("/", async (req, res) => {
    let sql = `select * from test_table;`;
    let result;

    result = await db.query(sql);
    console.log(result)
    res.json(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

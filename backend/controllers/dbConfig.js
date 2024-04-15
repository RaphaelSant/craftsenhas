const mysql = require("mysql");

const dbConfig = ({
    database: "sisfat",
    host: "localhost",
    user: "root",
    password: "root123"
});

const connection = mysql.createPool(dbConfig);

module.exports = connection;
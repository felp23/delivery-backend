const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const username = process.env.DBUSER;
const password = process.env.DBPASS;
const database = process.env.DBDATABASE;
const host = process.env.DBHOST;
const dialect = process.env.DBDIALECT;

const connection = new Sequelize(database, username, password, {
    host,
    dialect
});

const conn = new mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database
});

module.exports = connection, conn;
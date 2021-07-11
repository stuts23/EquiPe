const mysql = require('mysql2')
let dotenv = require('dotenv');
let util = require('util');

// Env vars
dotenv.config();
const host = "localhost";
const user = "stuts";
const password = "ShihTzuDoggo";
const database = "test_db";

var connection = mysql.createPool({ host, user, password, database });

connection.query = util.promisify(connection.query);

module.exports=connection;
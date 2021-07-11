const UserModel = require("../models/user.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const sql = require('../db/db')

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class chatController {
  getPreviousChat = async (req, res, next) => {
    let sqlQuery = `SELECT * FROM messages`;
    sql.query(sqlQuery, (err, response) => {
      console.log(response, err);

      res.send(response)
    });
    console.log(sqlQuery);
  };

  getTeamChannels = async (req, res, next) => {
    let sqlQuery = `SELECT * FROM channels`;
    sql.query(sqlQuery, (err, response) => {
      console.log(response, err);

      res.send(response)
    });
    console.log(sqlQuery);
  };
}

module.exports = new chatController();

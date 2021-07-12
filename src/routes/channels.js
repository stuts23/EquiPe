// const express = require('express');
// const dotenv = require('dotenv');
const sql = require('../db/db');
// import { userIsAdmin, getUniqueId } from '../utils/chatutils';

class channels {
    createChannel = (req, res) => {
      console.log(req)
      const {channelId, channelName, serverId} = req.body
        sql.query(
            `INSERT INTO channels (channel_id, channel_name, server_id) VALUES (${sql.escape(channelId)}, ${sql.escape(
              channelName
            )}, ${sql.escape(serverId)})`
          );
    };

    deleteChannel = (req, res) => {
      sql.query(`DELETE FROM channels WHERE channel_id = ${sql.escape(channelId)}`);
    };
    
}
  
  module.exports = new channels();

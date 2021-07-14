const sql = require("../db/db");
// import { userIsAdmin, getUniqueId } from '../utils/chatutils';

class Team {
  createServer = (req, res) => {
    console.log(req);
    const { serverId, serverName } = req.body;
    sql.query(
      `INSERT INTO servers (server_id, server_name, owner_id) VALUES (${sql.escape(
        serverId
      )}, ${sql.escape(serverName)}, "teamowner")`
    );

    sql.query(
      `INSERT INTO userservers (server_id, user_id) VALUES (${sql.escape(
        serverId
      )}, ${sql.escape(req.currentUser.id)})`
    );
  };

  // deleteChannel = (req, res) => {
  //   sql.query(`DELETE FROM channels WHERE channel_id = ${sql.escape(channelId)}`);
  // };

  joinServer = (req, res) => {
    console.log(req);
    const { serverId } = req.body;
    sql.query(
      `INSERT INTO userservers (server_id, user_id) VALUES (${sql.escape(
        serverId
      )}, ${sql.escape(req.currentUser.id)})`
    );
  };

  fetchServer = (req, res) => {
    console.log(req);

    let sqlQuery = `SELECT * from userservers WHERE user_id = ${sql.escape(
      req.currentUser.id
    )}`;
    sql.query(sqlQuery, (err, response) => {
      console.log(response, err);

      res.send(response);
    });
  };
}

module.exports = new Team();

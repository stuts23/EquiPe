//import { Socket } from 'socket.io';
const Socket = require('socket.io');

// Dependencies
//const express = require('express');
const dotenv = require('dotenv');
const sql = require('./db/db')

var socketIO = require('socket.io');
var io;
//let io: SocketIO.Server = require('socket.io')(server);


async function socketSetup(server) {
  console.log('socket setup called')

  io = socketIO(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true,
    },
    allowEIO3: true
  });
  // Config for env variables
  dotenv.config();
  let clients = [];

  // Create socket Server listener
  io.on('connection', function (socket) {
    // Keep track of current socket userId
    let sessionUserId = '';
    let action;

    // Listens for new messages
    socket.on('simple-chat-message', async (msg) => {
      // Store messsage in the DB
      var date = new Date();

      console.log(msg.msg)

      let sqlQuery = `INSERT INTO messages (channel_id, user_name, msg, date) VALUES (${sql.escape(
      msg.channel_id
      )}, ${sql.escape(msg.user_name)}, ${sql.escape(msg.msg)}, ${sql.escape(date)})`;
      sql.query(sqlQuery, (res, err) => {console.log(res, err)});
      //const serverId = msg.server.split('-')[1];
      console.log(sqlQuery);


      // // Format our action for client to parse
      // action = { type: 'message', payload: msg };

      // Emit the message to everyone that joined that server
      //io.to(serverId).emit('update', action);

      io.emit('update', msg);
      console.log(msg);
    });

    // When user signs in he sends over his userId
    // Add to list of clients userId to identify socket.id
    socket.on('simple-chat-sign-in', (data) => {
      // Keep track of session userId to eventually remove from list of clients
      sessionUserId = data.userId;
      clients.push({ userId: sessionUserId, id: socket.id, userName: data.userName });
      let date = new Date();
      //sql.query(`UPDATE users SET user_last_active = ${sql.escape(date)} WHERE user_id = ${sql.escape(sessionUserId)}`);
    });

    // Listens for subscribing to servers (socket io rooms)
    socket.on('subscribe', (serverId) => {
      socket.join(serverId);
    });

    // On disconnect remove from client list
    socket.on('disconnect', () => {
      clients.find((client, i) => {
        if (client.userId === sessionUserId) {
          // Remove from global socket client list
          return clients.splice(i, 1);
        }
      });
    });

  });

 
}

module.exports = socketSetup;

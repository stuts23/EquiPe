const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const openViduRouter = require('./controllers/openviduroutes');
const socketSetup = require('./socket.js')
const http = require('http');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
const server = http.createServer(app);
socketSetup(server);

const port = Number(process.env.PORT || 3000);
app.use("/api/v1/openvidu", openViduRouter);
app.use(`/api/v1/users`, userRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
server.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
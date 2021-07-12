const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const chatController = require('../controllers/chatcontroller');
const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');
const channels = require('./channels');
const Team = require('./team');

router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1
// router.post('/chat', auth(), awaitHandlerFactory(chatController.chat));
router.get('/prevchats', auth(), awaitHandlerFactory(chatController.getPreviousChat));
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login
router.get('/channels', auth(), awaitHandlerFactory(chatController.getTeamChannels));

router.post('/channel/create', auth(), awaitHandlerFactory(channels.createChannel))
router.post('/channel/delete', auth(), awaitHandlerFactory(channels.deleteChannel))

router.post('/team/create', auth(), awaitHandlerFactory(Team.createServer));
router.post('/team/join', auth(), awaitHandlerFactory(Team.joinServer));
router.get('/team/fetch', auth(), awaitHandlerFactory(Team.fetchServer));

module.exports = router;
const express = require("express");
const tokenCheck = require('../utils/tokenCheck');
const handlerController = require('../controllers/handlerController');
const errorHandler = require('../utils/errorHandler');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

// --------------- task router --------------- //

router.get('/tasks/:id', taskController.getOne);
router.patch('/tasks/update/:id',tokenCheck, handlerController(taskController.update));
router.delete('/tasks/delete/:id',tokenCheck, handlerController(taskController.destroy));
router.get('/tasks',handlerController(taskController.getAll));
router.post('/tasks/add',tokenCheck, handlerController(taskController.create));

// --------------- user router --------------- //

router.get('/user/:id', userController.getOne);
router.patch('/user/update/:id',tokenCheck, handlerController(userController.update));
router.delete('/user/delete/:id',tokenCheck, handlerController(userController.destroy));
router.get('/user',tokenCheck, handlerController(userController.getAll));

router.post('/user/login', handlerController(userController.login));
router.post('/user/register', handlerController(userController.register));

router.use(errorHandler);

module.exports = router;
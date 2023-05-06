const express = require("express");
const router = express.Router();

const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const userHoursController = require('../controllers/userHoursController');
const userTaskController = require('../controllers/userTaskController');

// --------------- task router --------------- //

router.get('/tasks/:id', taskController.getOne);
router.patch('/tasks/update/:id', taskController.update);
router.delete('/tasks/delete/:id', taskController.delete);
router.get('/tasks', taskController.getAll);
router.post('/tasks/add', taskController.create);

// --------------- user router --------------- //

router.get('/user/:id', userController.getOne);
router.patch('/user/update/:id', userController.update);
router.delete('/user/delete/:id', userController.delete);
router.get('/user', userController.getAll);

router.post('/user/login', userController.login);
router.post('/user/register', userController.register);

// ---------------  user hours --------------- //

router.get('/user/hours/:id', userHoursController.getOne);
router.patch('/user/hours/update/:id', userHoursController.update);
router.delete('/user/hours/delete/:id', userHoursController.delete);
router.get('/hours', userHoursController.getAll);
router.post('/user/hours/add', userHoursController.create);

// ---------------  user task --------------- //

router.get('/user/task/:id', userTaskController.getOne);
router.patch('/user/task/update/:id', userTaskController.update);
router.delete('/user/task/delete/:id', userTaskController.delete);
router.get('/user/task', userTaskController.getAll);
router.post('/user/task/add', userTaskController.create);


module.exports = router;
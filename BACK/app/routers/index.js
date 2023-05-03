const express = require("express");
const router = express.Router();

const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

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


module.exports = router;
const express = require("express");
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/tasks/:id', taskController.getOne);
router.patch('/tasks/update/:id', taskController.update);
router.delete('/tasks/delete/:id', taskController.delete);
router.get('/tasks', taskController.getAll);
router.post('/tasks/add', taskController.create);

module.exports = router;
const taskDatamapper = require('../datamappers/taskDatamapper');


const taskController = {


    getAll: async(req, res, next) => {

            const tasks = await taskDatamapper.findAll();

            res.status(200).json(tasks);


    },

    getOne: async(req, res, next) => {

        const id = req.params.id;

        const task = await taskDatamapper.findOne(id);

        res.status(200).json(task);

    },

    create: async(req, res, next) => {
            
        const task = req.body;
    
        const newTask = await taskDatamapper.create(task);
    
        res.status(201).json(newTask);
    
    },

    update: async (req, res, next) => {
            
            const id = req.params.id;

            const task = req.body;
    
            const updatedTask = await taskDatamapper.update(id, task);
    
            res.status(200).json(updatedTask);
    
    },

    delete: async (req, res, next) => {


            const id = req.params.id;
    
            const task = await taskDatamapper.delete(id);
    
            res.status(200).json(task);
    
    }

    





}

module.exports = taskController;
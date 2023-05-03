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
    
        await taskDatamapper.create(task);
    
        res.status(201).json("La tâche a bien été créée");
    
    },

    update: async (req, res, next) => {
            
            const id = req.params.id;        
    
            await taskDatamapper.update(id, req.body);
    
            res.status(200).json("La tâche a bien été modifiée");
    
    },

    delete: async (req, res, next) => {


            const id = req.params.id;
    
            await taskDatamapper.delete(id);
    
            res.status(200).json("La tâche a bien été supprimée");
    
    }

    





}

module.exports = taskController;
const userTaskDatamapper = require('../datamappers/userTaskDatamapper');

const userTaskController = {

    getAll: async (req, res, next) => {
            
            const userTask = await userTaskDatamapper.findAll();
    
            res.status(200).json(userTask);
    
    },
    
    getOne: async (req, res, next) => {

        const id = req.params.id;

        const userTask = await userTaskDatamapper.findOne(id);

        res.status(200).json(userTask);

    },

    create: async (req, res, next) => {
            
            const userTask = req.body;
    
            console.log('createUserTask', userTask)
                
            await userTaskDatamapper.create(userTask);
                
            res.status(201).json("La tâche a bien été créée");
                
    },
    
    update: async (req, res, next) => {

        const id = req.params.id;

        console.log('ID TO MODIFY', id)
        console.log('BODY TO MODIFY', req.body)

        await userTaskDatamapper.update(id, req.body);

        res.status(200).json("La tâche a bien été modifiée");

    },

    delete: async (req, res, next) => {

        const id = req.params.id;

        console.log('ID TO DELETE', id)

        await userTaskDatamapper.delete(id);

        res.status(200).json("La tâche a bien été supprimée");

    }
};

module.exports = userTaskController;
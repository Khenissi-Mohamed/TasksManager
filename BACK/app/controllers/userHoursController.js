const userHoursDatamapper = require('../datamappers/userHoursDatamapper');

const userHoursController = {

    getAll: async (req, res, next) => {
        
        const userHours = await userHoursDatamapper.findAll();

        res.status(200).json(userHours);

    },

    getOne: async (req, res, next) => {
            
        const id = req.params.id;
    
        const userHours = await userHoursDatamapper.findOne(id);
    
        res.status(200).json(userHours);
    
    },
    
    create: async (req, res, next) => {
                
        const userHours = req.body;
        
        console.log('createUserHours', userHours)
            
        await userHoursDatamapper.create(userHours);
            
        res.status(201).json("Les heures ont bien été créées");
            
    },

    update: async (req, res, next) => {

        const id = req.params.id;

        console.log('ID TO MODIFY', id)
        console.log('BODY TO MODIFY', req.body)

        await userHoursDatamapper.update(id, req.body);

        res.status(200).json("Les heures ont bien été modifiées");

    },

    delete: async (req, res, next) => {

        const id = req.params.id;

        console.log('ID TO DELETE', id)

        await userHoursDatamapper.delete(id);

        res.status(200).json("Les heures ont bien été supprimées");

    }
}

module.exports = userHoursController;
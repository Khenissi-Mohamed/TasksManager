const taskDatamapper = require('../datamappers/taskDatamapper');
const userDatamapper = require('../datamappers/userDatamapper');

const taskController = {

    getAll: async(req, res, next) => {

            const tasks = await taskDatamapper.findAll();

            if(tasks instanceof Error){
                next(tasks)
            }
            res.status(200).json(tasks);
    },

    getOne: async(req, res, next) => {

        const id = req.params.id;
        const task = await taskDatamapper.findOne(id);

        if(task instanceof Error){
            next(task)
        }
        res.status(200).json(task);
    },

    create: async(req, res, next) => {
            
        const task = req.body;
        const create =  await taskDatamapper.create(task);

        if(create instanceof Error){
            next(create)
        }
        res.status(201).json("La tâche a bien été créée");
    },

    destroy: async (req, res, next) => {

        const id = req.params.id;  
        const destroyd = await taskDatamapper.destroy(id);

        if(destroyd instanceof Error){
            next(destroyd)
        }
        res.status(200).json("La tâche a bien été supprimée");
    },

    update: async (req, res, next) => {
    // Assignation d'une tache a un utilisateur => Update du user_id dans la table task

        const task_id = req.params.id;        
        const user_id = req.body.user_id;
                
    // Verification si l'utilisateur est libre au moment de l'execution de la nouvelle tache

        // Recuperer toutes les taches assignées a l'utilisateur et l'utilisateur en question
        const userTasks = await taskDatamapper.getTasksByUser(user_id);
        const user = await userDatamapper.findOne(user_id);

        // Si userTasks est vide (l'utilisateur n'a donc pas de taches assignées)
        // On ajoute lui assigne la nouvelle tache sans autres verifications
        if(userTasks.length === 0){
            const update = await taskDatamapper.update(task_id, req.body)
            return res.status(200).json(`La tâche a bien été assignée à ${user.firstname} ${user.lastname}`);
        }
            
        const newTask = await taskDatamapper.findOne(task_id) 
        const newStart = newTask.start_date;
        const newEnd = newTask.end_date;
        const newDurationInHour = (newEnd - newStart) / 3600000
        const dayOfNewTask = newStart.toString().slice(0, 10)
        let conflict = false;
        let totalDuration = 0;
        let sameDayTaskCount = 0;
        
        // On boucle sur les taches assignées pour verifier la disponibilité 
        userTasks.forEach((task) => {
            const taskStart = task.start_date;
            const taskEnd = task.end_date;      
            const dayTask = taskStart.toString().slice(0, 10);
          
            if ((newStart >= taskStart && newStart < taskEnd) || (newEnd > taskStart && newEnd <= taskEnd) || (newStart <= taskStart && newEnd >= taskEnd)) {
                conflict = true;
                console.log('conflict');
            } else if (dayTask === dayOfNewTask) {
                // Calcul du nombre d'heures deja assignées dans la journée de la nouvelle tache
                sameDayTaskCount++;
                const durationInHour = (taskEnd - taskStart) / 3600000;
                totalDuration += durationInHour
            }
        });
          
            //  On verifie si l'utilisateur a deja 8h de taches assignées ce jour là et empêche l'assignation à plusieurs taches à la fois
            const totalDurationWithNewTask = newDurationInHour + totalDuration;

            if (conflict) {
                return res.status(200).json(`${user.firstname} ${user.lastname} a déjà une tâche prévue à ce moment là`);
            }
            else if (totalDurationWithNewTask > 8) {
                return res.status(200).json(`${user.firstname} ${user.lastname} a déjà 8h de tâches prévues ce jour là`);
            }
            else
            {       
                await taskDatamapper.update(task_id, req.body)
                return res.status(200).json(`La tâche a bien été assignée à ${user.firstname} ${user.lastname}`);
            }
       },
            
}







 



    







module.exports = taskController;
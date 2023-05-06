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

        console.log('createTask', task)
    
        await taskDatamapper.create(task);
    
        res.status(201).json("La tâche a bien été créée");
    
    },

    update: async (req, res, next) => {
            
            const id = req.params.id;        
            const user_id = req.body

            const userTasks = await taskDatamapper.getTasksByUser(user_id)

            console.log('ID TO MODIFY', id)
            console.log('BODY TO MODIFY', req.body)

    
            await taskDatamapper.update(id, req.body);
    
            res.status(200).json("La tâche a bien été modifiée");
    
    },

    delete: async (req, res, next) => {


        const id = req.params.id;
        
        console.log('ID TO DELETE', id)
    
            await taskDatamapper.delete(id);
    
            res.status(200).json("La tâche a bien été supprimée");
    
    },

/*     createTask: async (req, res, next) => {

        const { libelle, start_date, end_date, status, user_id} = req.body

        const userTasks = await taskDatamapper.getTasksByUser(user_id)

        // 
        if(!userTasks) {

            
            // PASSE A LA DEUXIEME CONDITION QUI VERIFIE SI L'USER TRAVAILLE PLUS DE 8H PAR JOURS

        }

        userTasks.forEach(task => {

            if(start_date < task.start_date && end_date < task.start_date || start_date > task.end_date && end_date > task.end_date){

                // OK 
                //SECONDE CONDITION 
            }

            //SECONDE CONDITION = 
            // si la tache est sur un seul jour : 
                // Selectionne les taches prevues qui se deroulent sur le meme jour que la data a associer
                // calcule la durée des taches associées et de la ta A associer
                // SI c'est plus petit ou egal a 8 c'est ok sinon non


                let hoursWorked = 7; // Exemple de nombre d'heures travaillées


                if (hoursWorked >= 8) {
                hoursWorked = 8; // Limite le nombre d'heures travaillées à 8 heures
                }

            
                const startWorkHour = 9; // Heure de début de travail
                const endWorkHour = 17; // Heure de fin de travail
                const maxWorkHourPerDay = 8; // Maximum d'heures de travail par jour

                const currentHour = new Date().getHours(); // Obtient l'heure actuelle

                let hoursWorkedToday = currentHour - startWorkHour; // Calcule le nombre d'heures travaillées aujourd'hui

                if (hoursWorkedToday >= maxWorkHourPerDay) {
                hoursWorkedToday = maxWorkHourPerDay; // Limite le nombre d'heures travaillées à un maximum de 8 heures par jour
                }

                console.log(hoursWorkedToday); // Affiche le nombre d'heures travaillées aujourd'hui, limité à 8 heures si nécessaire

            
        });

         */
    }







 



    







module.exports = taskController;
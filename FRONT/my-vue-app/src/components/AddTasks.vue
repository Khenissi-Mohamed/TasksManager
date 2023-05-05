<style scoped>
.add-task-title {
    text-align: center;
}

.add-task-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>
<template>
    <div>
        <h1 class="add-task-title">Add tasks</h1>
        <form class="add-task-form" @submit.prevent="handleSubmit">
            <label for="libelle">Libellé :</label>
            <input type="text" name="libelle" id="libelle" v-model="task.libelle" required>

            <label for="start_date">Début :</label>
            <input type="datetime-local" name="start_date" id="start_date" v-model="task.start_date" required>

            <label for="end_date">Fin :</label>
            <input type="datetime-local" name="end_date" id="end_date" v-model="task.end_date" required>

            <label for="description">Description :</label>
            <textarea id="description" name="description" v-model="task.description"></textarea>

            <label for="status">Status :</label>
            <select id="status" name="status" v-model="task.status">
                <option value="todo">A faire</option>
                <option value="in_progress">En cours</option>
                <option value="done">Terminé</option>
            </select>

            <button type="submit">Enregistrer</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            task: {
                libelle: '',
                start_date: '',
                end_date: '',
                description: '',
                status: 'todo',
                user_id: 1, // changer le user_id si nécessaire
            },
        };
    },
    methods: {
        handleSubmit() {
            // Ajoutez ici la logique pour formatter la date et l'heure de début et de fin au format MySQL datetime
            const formattedStartDate = this.task.start_date.replace('T', ' ').replace(':00.000', '');
            const formattedEndDate = this.task.end_date.replace('T', ' ').replace(':00.000', '');

            // Envoie la requête POST à l'API backend
            axios.post('http://localhost:3000/tasks/add', {
                libelle: this.task.libelle,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                description: this.task.description,
                status: this.task.status,
                user_id: this.task.user_id,
            })
                .then(response => {
                    console.log(response.data);
                    // Ajoutez ici la logique pour rediriger l'utilisateur vers la page de la liste des tâches
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};
</script>
  




<!-- <script>
import axios from 'axios';
export default {
    name: 'Homepage',
    data() {
        return {
            task: {
                libelle: '',
                heureDebut: '',
                heureFin: '',
            },
            tasks: []
        }
    },
    methods: {
        async handleSubmit() {
            // Code pour envoyer la tâche à la base de données
            const task = {
                ...this.task,
            }
            task.user_id = "";
            console.log(task)

            // Envoyer la tâche au backend
            try {
                const response = await axios.post('http://localhost:3000/tasks/add', task, {

                });
                const newTask = response.data;
                // Ajouter la tâche à la liste des tâches
                this.tasks.push(newTask);// $store.commit sert à appeler une mutation disponible grace à Vuex 
            } catch (error) {
                console.log(error);
            }



            // Réinitialiser le formulaire
            this.task.label = ''
            this.task.start = ''
            this.task.end = ''
        }
    }
}
</script> -->

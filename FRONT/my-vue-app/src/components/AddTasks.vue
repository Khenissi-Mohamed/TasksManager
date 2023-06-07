<template>
    <NavBar />
    <div class="add-task-main">
        <h1 class="add-task-title">Add tasks</h1>
        <form class="add-task-form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="libelle">Libellé :</label>
                <input type="text" name="libelle" id="libelle" v-model="task.libelle" required>
            </div>
            <div class="form-group">
                <label for="start_date">Début :</label>
                <input type="date" name="start_date" id="start_date" v-model="task.start_date" required>
            </div>
            <div class="form-group" style="display: none;">
                <label for="end_date">Fin :</label>
                <input type="date" name="end_date" id="end_date" v-model="task.end_date">
            </div>
            <div class="form-group">
                <label for="start_time">Heure de début :</label>
                <input type="time" name="start_time" id="start_time" v-model="task.start_time" required>
            </div>
            <div class="form-group">
                <label for="end_time">Heure de fin :</label>
                <input type="time" name="end_time" id="end_time" v-model="task.end_time" required>
            </div>
            <div class="form-group">
                <label for="description">Description :</label>
                <textarea id="description" name="description" v-model="task.description"></textarea>
            </div>
            <div class="form-group">
                <label for="status">Status :</label>
                <select id="status" name="status" v-model="task.status">
                    <option value="todo">A faire</option>
                    <option value="in_progress">En cours</option>
                    <option value="done">Terminé</option>
                </select>
            </div>
            <button type="submit" class="add-task-btn">Enregistrer</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
    components: { NavBar },
    data() {
        return {
            task: {
                libelle: "",
                start_date: "",
                end_date: "",
                start_time: "",
                end_time: "",
                description: "",
                status: "todo",
                user_id: null,
            },
            tasks: [],
        };
    },
    methods: {
        async handleSubmit() {
            // La logique pour formatter la date et l'heure de début et de fin au format MySQL datetime
            let formattedStartDate = this.task.start_date.replace("T", `${this.task.start_time}`);
            let formattedEndDate = this.task.end_date.replace("T", `${this.task.end_time}`);
            const endateModify = formattedStartDate.slice(0, 10);
            formattedEndDate = endateModify + `-${this.task.end_time}`;
            formattedStartDate = formattedStartDate + `-${this.task.start_time}`;
            // Envoie la requête POST à l'API 
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post("http://task-manager-gtp.up.railway.app/tasks/add", {
                    libelle: this.task.libelle,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                    description: this.task.description,
                    status: this.task.status,
                    user_id: this.task.user_id,
                }, { headers: { Authorization: `Bearer ${token}` } });
                this.tasks.push(response.data);
                const router = this.$router;
                router.push("/tasks/all");
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    components: { NavBar }
};
</script>
<style scoped>
.add-task-main {
    width: 80%;
}

.add-task-title {
    text-align: center;
}

.add-task-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="datetime-local"],
textarea,
select {
    padding: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

textarea {
    height: 100px;
}

.add-task-btn {
    background: radial-gradient(103.18% 236.51% at 96.82% 50%, #D13650 0%, #D33B64 32.29%, #9C3D80 54.17%, #3565A5 100%), #1D1D1B;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.add-task-btn:hover {
    background: rgb(33, 50, 68);
    background: linear-gradient(90deg, rgba(33, 50, 68, 1) 0%, rgba(5, 119, 62, 1) 25%, rgba(20, 22, 28, 1) 96%);
    transition: all 0.3s ease-in-out;
}
</style>
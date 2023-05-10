<template >
    <NavBar />
    <div class="assignement-task-wrapper">
        <h1>Assigner une tâche</h1>
        <form class="assignement-task-form" @submit.prevent="assignTask">
            <label for="employee">Employé :</label>
            <select id="employee" v-model="employee" required>
                <option value="">Choisir un employé</option>
                <option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.lastname }} {{
                    employee.firstname }}</option>
            </select>
            <label for="task">Tâche :</label>
            <select id="task" v-model="task" required>
                <option value="">Choisir une tâche</option>
                <option v-for="task in unassignedTasks" :key="task.id" :value="task.id">{{ task.libelle }}</option>
            </select>
            <button type="submit">Assigner</button>
        </form>
    </div>
    <div class="assignement-task-table">
        <h1>Tableau des tâches assignées</h1>
        <div class="error-message" v-if="errorMessage">
            {{ errorMessage }}
        </div>
        <table>
            <thead>
                <tr>
                    <th>Employé</th>
                    <th>Tâche</th>
                    <th>Durée total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{ employees.find(e => e.id === task.user_id) ? employees.find(e => e.id === task.user_id).firstname
                        + ' ' + employees.find(e => e.id === task.user_id).lastname : 'Non assignée' }}</td>
                    <td>{{ task.libelle }}</td>
                    <td>{{ duration(task) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
    components: { NavBar },
    data() {
        return {
            employee: "",
            task: "",
            employees: [],
            tasks: [],
            errorMessage: "",
        };
    },
    computed: {
        unassignedTasks() {
            return this.tasks.filter(task => !task.employee_id);
        },
        assignedTasks() {
            return this.tasks.filter(task => task.employee_id);
        },
    },
    methods: {
        duration(task) {
            const start = new Date(task.start_date);
            const end = new Date(task.end_date);
            const duration = (end - start) / 1000 / 60 / 60;
            return duration.toFixed(2);
        },
        async assignTask() {
            // verifier si la tache est deja assignée
            // if (this.tasks.find(task => task.id === this.task).user_id) {
            //     this.errorMessage = 'Cette tâche est déjà assignée';
            //     setTimeout(() => {
            //         this.errorMessage = '';
            //     }, 3000);
            //     return;
            // }
            // verifier si l'employé a travaillé plus de 8h
            // Code pour affecter la tâche à l'employé dans la base de données
            try {
                const response = await axios.patch(`https://task-manager-gtp.up.railway.app/tasks/update/${this.task}`, {
                    user_id: this.employee,
                }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
                this.errorMessage = response.data;
                this.getTasks();
            }
            catch (error) {
                console.log(error);
            }
            // Réinitialiser le formulaire
            this.task = "";
        },
        async getEmployees() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://task-manager-gtp.up.railway.app/user", { headers: { Authorization: `Bearer ${token}` } });
                this.employees = response.data;
                console.log("employees", response);
            }
            catch (error) {
                console.log(error);
            }
        },
        async getTasks() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://task-manager-gtp.up.railway.app/tasks", { headers: { Authorization: `Bearer ${token}` } });
                this.tasks = response.data;
                console.log("task", response);
            }
            catch (error) {
                console.log(error);
            }
        },
        async updateAssignedTasks() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://task-manager-gtp.up.railway.app/tasks", { headers: { Authorization: `Bearer ${token}` } });
                this.tasks = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getEmployees();
        this.getTasks();
    },
    components: { NavBar }
};

</script>
<style scoped>
.assignement-task-wrapper {
    width: 80%;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
}

label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

select {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
}

button[type="submit"] {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: radial-gradient(103.18% 236.51% at 96.82% 50%, #D13650 0%, #D33B64 32.29%, #9C3D80 54.17%, #3565A5 100%), #1D1D1B;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

button:hover {
    background: rgb(33, 50, 68);
    background: linear-gradient(90deg, rgba(33, 50, 68, 1) 0%, rgba(5, 119, 62, 1) 25%, rgba(20, 22, 28, 1) 96%);
}


.assignement-task-table {
    width: 80%;
    margin: 2rem auto;
    text-align: center;
}

h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead th {
    background-color: #ccc;
    color: white;
    text-align: center;
    padding: 0.5rem 0;
}

tbody td,
tbody th {
    padding: 0.5rem 0;
    border: 1px solid #ccc;
}

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

.error-message {
    color: red;
    font-weight: bold;
    margin-bottom: 1rem;
}
</style>
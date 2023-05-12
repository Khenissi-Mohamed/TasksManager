<template >
    <NavBar />
    <div class="main">
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
                        <th>Période</th>
                        <th>Durée</th>
                        <th>Durée total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasks" :key="task.id">
                        <td>{{ employees.find(e => e.id === task.user_id) ? employees.find(e => e.id ===
                            task.user_id).firstname
                            + ' ' + employees.find(e => e.id === task.user_id).lastname : 'Non assignée' }}</td>
                        <td>{{ task.libelle }}</td>
                        <td>{{ formatDateStart(task.start_date) }} </td>
                        <td>de {{ formatDate(task.start_date) }} à {{ formatDate(task.end_date) }}</td>
                        <td>{{ duration(task) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            const durationInMs = end - start;
            const hours = Math.floor(durationInMs / (1000 * 60 * 60));
            const minutes = Math.floor((durationInMs / (1000 * 60)) % 60);
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            return `${hours}h${formattedMinutes}`;
        },
        formatDateStart(date) {
            const options = { year: "numeric", month: "numeric", day: "numeric" };
            return new Intl.DateTimeFormat("fr-FR", options).format(new Date(date));
        },
        formatDate(date) {
            {
                const options = { hour: "numeric", minute: "numeric", hour12: false, timeZone: "Europe/Paris" };
                return new Intl.DateTimeFormat("fr-FR", options).format(new Date(date));
            }

        },
        async assignTask() {
            try {
                const task = this.tasks.find(task => task.id === this.task);
                console.log("task8888", task);
                const start = new Date(task.start_date);
                const end = new Date(task.end_date);
                const durationInMs = end - start;
                const hours = Math.floor(durationInMs / (1000 * 60 * 60));

                if (hours > 8) {
                    this.errorMessage = "Refusé : Un employé ne peut pas travailler plus de 8 heures sur une tâche. Veuillez adapter la durée de la tâche.";
                } else {

                    const response = await axios.patch(`https://task-manager-gtp.up.railway.app/tasks/update/${this.task}`, {
                        user_id: this.employee,
                    }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
                    this.errorMessage = response.data;
                    this.getTasks();
                }

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
.main {
    display: flex;
    flex-direction: column;
    gap: 2rem;


}

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
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    text-align: left;
}

select {
    display: flex;
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
    padding: 0.5rem;
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

@media (max-width: 700px) {
    table {
        border: 0;
    }

    table caption {
        font-size: 1.3em;
    }

    table thead {
        border: none;
        clip: rect(0 0 0 0);
        overflow: hidden;
        padding: 0;
        position: absolute;
    }

    table tr {
        border-bottom: 3px solid #ddd;
    }

    table td {
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: center;
        font-size: 0.8em;
    }

    table td:nth-child(1),
    table td:nth-child(2) {
        font-weight: bold;
    }

    button {
        padding: 5px 10px;
        font-size: 0.8em;
    }
}
</style>
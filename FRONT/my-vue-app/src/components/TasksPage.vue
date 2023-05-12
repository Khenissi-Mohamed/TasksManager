<template>
    <NavBar />
    <div class="table-wrapper">
        <h1>Liste des tâches</h1>
        <label for="tri">Trier par :</label>
        <select id="tri" v-model="orderBy">
            <option value="start_date">Heure de début</option>
            <option value="end_date">Heure de fin</option>
            <option value="libelle">Libellé</option>
        </select>
        <table>
            <thead>
                <tr>
                    <th>Libellé</th>
                    <th>Heure de début</th>
                    <th>Heure de fin</th>
                    <th>Durée total</th>
                    <th>Déscription</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasksSorted" :key="index">
                    <td>{{ task.libelle }}</td>
                    <td>{{ formatDate(task.start_date) }}</td>
                    <td>{{ formatDate(task.end_date) }}</td>
                    <td>{{ duration(task) }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.status }}</td>
                    <td>
                        <button @click="handleDelete(task.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="action-btn-wrapper">
        <router-link to="/tasks">
            <button>Ajouter une tâche</button>
        </router-link>
        <router-link to="/tasks/assignement">
            <button>Assigner une tâche</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
    components: { NavBar },
    data() {
        return {
            orderBy: "start_date",
            tasks: []
        };
    },
    computed: {
        tasksSorted() {
            return this.tasks.sort((a, b) => a[this.orderBy] < b[this.orderBy] ? -1 : 1);
        }
    },
    methods: {
        handleDelete(taskId) {
            axios.delete(`https://task-manager-gtp.up.railway.app/tasks/delete/${taskId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            const index = this.tasks.findIndex(task => task.id === taskId);
            this.tasks.splice(index, 1);
        },
        duration(task) {
            const start = new Date(task.start_date);
            const end = new Date(task.end_date);
            const durationInMs = end - start;
            const hours = Math.floor(durationInMs / (1000 * 60 * 60));
            const minutes = Math.floor((durationInMs / (1000 * 60)) % 60);
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const duration = (end - start) / 1000 / 60 / 60;
            return `${hours}h${formattedMinutes}`;
        },

        formatDate(date) {
            return new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(date));
        }
    },
    async created() {
        const token = localStorage.getItem("token");
        console.log("token du get", token);
        const tasks = await axios.get("https://task-manager-gtp.up.railway.app/tasks", { headers: { Authorization: `Bearer ${token}` } });
        console.log("tasks", tasks);
        this.tasks = tasks.data;
    },
    components: { NavBar }
}
</script>

<style scoped>
.table-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
}

h1 {
    font-size: 2rem;
}

label {
    display: inline-block;
    font-weight: bold;
}

select {
    display: block;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
}

thead {
    background-color: #eee;
    border: 1px solid #ddd;
}

th,
td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;

}

th {
    font-weight: bold;
}

tbody tr:nth-child(0) {
    background-color: #f2f2f2;
}

button {
    background: radial-gradient(103.18% 236.51% at 96.82% 50%, #D13650 0%, #D33B64 32.29%, #9C3D80 54.17%, #3565A5 100%), #1D1D1B;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background: rgb(147, 22, 77);
    background: linear-gradient(90deg, rgba(147, 22, 77, 1) 0%, rgba(229, 57, 53, 1) 33%, rgba(68, 38, 38, 1) 100%);
    transition: all 0.3s ease-in-out;
}

.action-btn-wrapper {
    display: flex;
    gap: 1rem;
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

    table td:nth-child(0) {
        font-weight: bold;
    }

    table td:nth-child(1) {
        font-weight: bold;
    }

    button {
        padding: 5px 10px;
        font-size: 0.8em;
    }

}
</style>
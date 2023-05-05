<style scoped>
.table-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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


}
</style>
<template>
    <div class="table-wrapper">
        <h1>Liste des tâches</h1>
        <label for="tri">Trier par :</label>
        <!--orderBy est une propriété de data donc là on fait du two-way binding c'est à dire que si on change la valeur de orderBy dans le code, la valeur du select sera aussi modifiée et vice-versa -->
        <select id="tri" v-model="orderBy">

            <!-- // v-model est similaire à value de React et onChange est implicite ici contrairement à React où il faut le définir explicitement avec @change // -->
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
                    <th>Déscription</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasksSorted" :key="index"> <!-- tasksSorted est une propriété calculée -->
                    <td>{{ task.libelle }}</td> <!-- task est un objet -->
                    <td>{{ formatDate(task.start_date) }}</td>
                    <td>{{ formatDate(task.end_date) }}</td>
                    <td>{{ task.description }}</td>
                    <td>
                        <!-- @click est un événement similaire à onClick de React -->
                        <button @click="handleDelete(task.id)">Supprimer
                        </button> <!-- handleDelete est une méthode -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
// import { mounted } from 'vue';
export default {
    data() { // data est similaire aux states de React
        return {
            orderBy: 'start_date',
            tasks: []
        }
    },
    computed: { // computed est similaire aux props de React
        tasksSorted() {
            return this.tasks.sort((a, b) => a[this.orderBy] < b[this.orderBy] ? -1 : 1);
        }
    },
    methods: { // methods est similaire aux méthodes de React
        handleDelete(taskId) {
            // Envoyer l'identifiant de la tâche au backend pour la supprimer de la base de données
            axios.delete(`http://localhost:3000/tasks/delete/${taskId}`)
            const index = this.tasks.findIndex(task => task.id === taskId)
            this.tasks.splice(index, 1)
        },
        formatDate(date) {
            return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Paris' }).format(new Date(date))
        }

    },
    async created() {
        // Récupérer les tâches depuis le backend et les stocker dans la variable "tasks"
        const tasks = await axios.get('http://localhost:3000/tasks')
        this.tasks = tasks.data
    },

}
</script>

<style scoped>
.table-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, index) in tasksSorted" :key="index"> <!-- tasksSorted est une propriété calculée -->
                    <td>{{ task.libelle }}</td> <!-- task est un objet -->
                    <td>{{ formatDate(task.start_date) }}</td>
                    <td>{{ formatDate(task.end_date) }}</td>
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

<style scoped>
.assignement-task-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.assignement-task-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>
<template >
    <div class="assignement-task-wrapper">
        <h1>Assigner une tâche</h1>
        <form class="assignement-task-form" @submit.prevent="assignTask">
            <!-- @submit est un raccourci pour @submit="assignTask($event)" -->
            <label for="employee">Employé :</label>
            <select id="employee" v-model="employee" required>
                <option value="">Choisir un employé</option>
                <option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.lastname }} {{
                    employee.firstname }}</option>
            </select>

            <label for="task">Tâche :</label>
            <select id="task" v-model="task" required>
                <!--v-model permet de lier la valeur de l'input à la propriété task -->
                <option value="">Choisir une tâche</option>
                <option v-for="task in unassignedTasks" :key="task.id" :value="task.id">{{ task.libelle }}</option>
            </select>

            <button type="submit">Assigner</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';


export default {
    data() {
        return {
            employee: '',// employee est l'id de l'employé
            task: '', // task est l'id de la tâche
            employees: [], // employees est un tableau d'objets contenant les employés
            tasks: [], // tasks est un tableau d'objets contenant les tâches
        };
    },
    computed: {
        unassignedTasks() {
            return this.tasks.filter(task => !task.employee_id);
        },
    },
    methods: {
        async assignTask() {
            // Code pour affecter la tâche à l'employé dans la base de données
            try {
                const response = await axios.patch(`http://localhost:3000/tasks/update/${this.task}`, {
                    user_id: this.employee,
                });
                console.log(response);
                this.getTasks();
            } catch (error) {
                console.log(error);
            }
            // Réinitialiser le formulaire
            this.task = '';
        },
        async getEmployees() {
            try {
                const response = await axios.get('http://localhost:3000/user');
                this.employees = response.data;
            } catch (error) {
                console.log(error);
            }

        },
        async getTasks() {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                this.tasks = response.data; // this.task est un tableau d'objets dans notre data qui contient toutes les tâches
                console.log("task", response);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() { // Le composant est monté dans le DOM similaire à useEffect en React
        this.getEmployees();
        this.getTasks();
    },
};


</script>
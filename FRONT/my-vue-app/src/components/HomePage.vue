<style scoped>
.navBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    height: 5rem;
    background: #ccc;
}
</style>

<template >
    <div class="navBar">
        <RouterLink to="/tasks">
            Add tasks
        </RouterLink>
        <RouterLink to="/tasks/assignement">
            Assign tasks
        </RouterLink>
        <RouterLink to="/tasks/all">
            Tasks
        </RouterLink>
    </div>
    <div class="dashboard">
        <!-- <AddTasks /> -->
        <Login />
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import AddTasks from './AddTasks.vue';
import TasksAssignement from './TasksAssignement.vue';
import TasksPage from './TasksPage.vue';
import Login from './login.vue';
export default {
    components: { AddTasks, TasksAssignement, TasksPage, Login }
}
</script>
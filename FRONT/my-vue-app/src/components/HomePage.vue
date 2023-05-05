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
    ;
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
</template>
<script>
import { RouterLink } from 'vue-router';
export default {
}
</script>
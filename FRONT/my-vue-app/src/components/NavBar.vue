<template lang="">
    <div class="navBar">
        <RouterLink to="/">
            Home
        </RouterLink>
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
    components: { RouterLink }

}
</script>
<style >
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
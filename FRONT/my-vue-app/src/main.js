import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import TasksPage from './components/TasksPage.vue'
import TasksAssignement from './components/TasksAssignement.vue'
import AddTasks from './components/AddTasks.vue'


const routes = [
    { path: '/', component: HomePage },
    { path: '/tasks', component: AddTasks },
    { path: '/tasks/assignement', component: TasksAssignement },
    { path: '/tasks/all', component: TasksPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import TaskEditView from '../views/TaskEditView.vue'

const routes = [
    { path: '/', redirect: '/task' },
    { path: '/task', name: 'TaskList', component: MainView },
    { path: '/task/:taskId', name: 'TaskEdit', component: TaskEditView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
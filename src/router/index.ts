import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import TaskListView from '../views/TaskListView.vue'
import TaskEditView from '../views/TaskEditView.vue'

const routes = [
    { path: '/', redirect: '/task' },
    { path: '/task', name: 'TaskList', component: TaskListView },
    { path: '/task/:taskId', name: 'TaskEdit', component: TaskEditView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue'
import TaskListView from '../views/TaskListView.vue'

const routes = [
    { path: '/', name: 'Home', component: TaskView },
    { path: '/task/:id', name: 'Task', component: TaskView },
    { path: '/task', name: 'TaskList', component: TaskListView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
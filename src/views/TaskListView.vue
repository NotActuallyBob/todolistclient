<template>
    <div>
        <TaskCreateComponent></TaskCreateComponent>
        <TaskListComponent 
            v-for="task in store.tasks" 
            :key="task.id"
            :task="task">
        </TaskListComponent>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TaskListComponent from '../components/TaskListComponent.vue';
import TaskCreateComponent from '../components/TaskCreateComponent.vue';
import { useTaskStore } from '../store/useTaskStore';

const store = useTaskStore();

onMounted(async () => {
    await store.fetchTasks();
});

</script>

<style scoped>

</style>../store/useTaskStore
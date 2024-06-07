<template>
    <div>
        <TaskCreateComponent></TaskCreateComponent>
        <Suspense>
            <template #default>
                <TaskListComponent v-for="task in tasks" :task="task"></TaskListComponent>
            </template>
            <template #fallback>
                <div>Loading...</div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type task from '../model/task';
import TaskListComponent from '../components/TaskListComponent.vue';
import TaskCreateComponent from '../components/TaskCreateComponent.vue';

const tasks = ref<task[] | null>(null);

async function fetchTask() {
    const response = await fetch('http://localhost:8080/task');
    tasks.value = await response.json();    
    console.log(tasks.value);
}

onMounted(async () => {
    await fetchTask();
});

</script>

<style scoped>

</style>
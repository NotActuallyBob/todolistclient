<template>
    <div>
        <TaskCreateComponent></TaskCreateComponent>
        <div v-if="loading">Loading tasks...</div>
        <div v-else>
            <TaskComponent 
                v-for="task in store.tasks" 
                :key="task.id"
                :task="task">
            </TaskComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskComponent from '../components/TaskComponent.vue';
import TaskCreateComponent from '../components/TaskCreateComponent.vue';
import { useTaskStore } from '../store/useTaskStore';
import { watch, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const store = useTaskStore();
const route = useRoute();
const loading = ref(true);

onMounted(async () => {
    loading.value = true;
    console.log('lol');
    await store.fetchTasks();
    loading.value = false;
});

watch(route, async () => {
    loading.value = true;
    console.log('lol');
    await store.fetchTasks();
    loading.value = false;
});


</script>

<style scoped>

</style>../store/useTaskStore
<template>
    <TaskForm
        :form-task="task!"
        :is-edit="true">
    </TaskForm>
</template>

<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useTaskStore } from '../store/useTaskStore';
import Task from '../model/task';

const route = useRoute();
const task = ref<Task | undefined>(undefined);
const store = useTaskStore();
onMounted(() => {
    task.value = store.getTask(Number(route.params.taskId));
});

</script>

<style scoped>

</style>
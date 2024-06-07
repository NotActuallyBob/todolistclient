<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="New Task"
            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <TaskForm 
                :form-task="newRefTask"
                :is-edit="false"
                @close-dialog="isActive.value = false">
            </TaskForm>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue';

import { ref } from 'vue';
import type Task from '../model/task';

const newTask: Task = {
    id: 0,
    name: '',
    dueDate: new Date(),
    done: false
}
const newRefTask = ref<Task>(newTask);
</script>
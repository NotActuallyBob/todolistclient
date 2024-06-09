<template>
    <v-card>
        <v-card-title>
            {{ task!.name }}
        </v-card-title>
        <v-card-subtitle>
            {{ task!.dueDate.getDate() }}.{{ task!.dueDate.getMonth() }}.{{ task!.dueDate.getFullYear() }}
            <br>
            {{  task!.project.name }}
        </v-card-subtitle>
        <v-card-actions>
            <v-btn @click="store.deleteTask(task.id)"><v-icon icon="mdi-delete"></v-icon></v-btn>
            <v-btn @click="$router.push('/task/' + task.id)"><v-icon icon="mdi-pencil"></v-icon></v-btn>
            <v-btn @click="setTaskDone"><v-icon icon="mdi-check-bold"></v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script async setup lang="ts">
import type Task from '../model/task';
import { useTaskStore } from '../store/useTaskStore';

const store = useTaskStore();

function setTaskDone() {
    props.task.done = true;
    store.editTask(props.task.id, props.task);
}

const props = defineProps<{ 
  task: Task
}>()

</script>

<style scoped>

</style>
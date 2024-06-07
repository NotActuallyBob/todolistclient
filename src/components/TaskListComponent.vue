<template>
    <v-card>
        <v-card-title>
            {{ task!.name }}
        </v-card-title>
        <v-card-subtitle>
            {{ task!.dueDate.getDate() }}.{{ task!.dueDate.getMonth() }}.{{ task!.dueDate.getFullYear() }}
        </v-card-subtitle>
        <v-card-actions>
            <v-btn @click="store.deleteTask(task.id)"><v-icon icon="$delete"></v-icon></v-btn>
            <v-btn @click="$router.push('/task/' + task.id)"><v-icon icon="$edit"></v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script async setup lang="ts">
import type Task from '../model/task';
import { useTaskStore } from '../store/useTaskStore';

const store = useTaskStore();


const props = defineProps<{ 
  task: Task
}>()

</script>

<style scoped>

</style>
<template>
    <v-card>
        <v-card-title>
            {{ task!.id }} - {{ task!.name }}
        </v-card-title>
        <v-card-subtitle>
            {{ task!.dueDate }}
        </v-card-subtitle>
        <v-card-actions>
            <v-btn @click="$emit('delete')"><v-icon icon="$delete"></v-icon></v-btn>
            <v-btn @click="$emit('edit', task)"><v-icon icon="$edit"></v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script async setup lang="ts">
import type Task from '../model/task';



const props = defineProps<{ 
  task: Task
}>()

</script>

<style scoped>

</style>
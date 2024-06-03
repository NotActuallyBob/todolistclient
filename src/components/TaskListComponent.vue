<template>
    <v-card>
        <v-card-title>
            <div>
                <RouterLink :to="'/task/' + task.id">{{ task!.name }}</RouterLink>
            </div>
        </v-card-title>
    </v-card>
</template>

<script async setup lang="ts">
import type task from '../model/task';

const props = defineProps<{ 
  task: task
}>()

</script>

<style scoped>

</style>
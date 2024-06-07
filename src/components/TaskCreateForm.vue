<template>
    <TaskForm
        :form-task="formTask"
        :is-edit="false">
    </TaskForm>
</template>

<script setup lang="ts">
const props = defineProps<{ 
  formTask: Task
}>()

</script>

<style scoped>

</style>
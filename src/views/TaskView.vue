<template>
    <div>
        <Suspense>
            <template #default>
                <TaskComponent :id="$route.params.id"></TaskComponent>
            </template>
            <template #fallback>
                <div>Loading...</div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import TaskComponent from '../components/TaskComponent.vue';


</script>

<style scoped>

</style>
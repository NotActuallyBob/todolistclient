<template>
    <div>
        <div v-if="loading">Loading tasks...</div>
        <v-card v-else>
            <v-tabs
            v-model="tab"
            bg-color="primary"
            >
            <v-tab value="one">To Do</v-tab>
            <v-tab value="two">Done</v-tab>
            <v-tab value="three">New Task</v-tab>
            </v-tabs>

            <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                    <TaskComponent 
                        v-for="task in store.todoTasks" 
                        :key="task.id"
                        :task="task">
                    </TaskComponent>
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                    <TaskComponent 
                        v-for="task in store.doneTasks" 
                        :key="task.id"
                        :task="task">
                    </TaskComponent>
                </v-tabs-window-item>
                <v-tabs-window-item value="three">
                    <TaskForm></TaskForm>
                </v-tabs-window-item>
            </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import TaskComponent from '../components/TaskComponent.vue';
import TaskForm from '../components/TaskForm.vue';
import { useTaskStore } from '../store/useTaskStore';
import { watch, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const store = useTaskStore();
const route = useRoute();
const loading = ref(true);
const tab = ref('one');

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
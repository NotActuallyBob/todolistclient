<template>
    <div>
        <v-card>
            <v-tabs
            v-model="tab"
            bg-color="primary"
            >
            <v-tab value="one">To Do</v-tab>
            <v-tab value="two">Done</v-tab>
            <v-tab value="three">New Task</v-tab>
            <v-tab value="four">Projects</v-tab>
            </v-tabs>

            <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                    <TaskList
                        :show-done="false"
                    ></TaskList>
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                    <TaskList
                        :show-done="true"
                    ></TaskList>
                </v-tabs-window-item>
                <v-tabs-window-item value="three">
                    <TaskForm></TaskForm>
                </v-tabs-window-item>
                <v-tabs-window-item value="four">
                    <h1>Existing projects:</h1>
                    <p v-for="project in projectStore.projects"> {{ project.name }} </p>
                    <ProjectForm></ProjectForm>
                </v-tabs-window-item>
            </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import ProjectForm from '../components/ProjectForm.vue';
import { useProjectStore } from '../store/useProjectStore';
import { useTaskStore } from '../store/useTaskStore';
import { watch, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const taskStore = useTaskStore();
const projectStore = useProjectStore();
const route = useRoute();
const tab = ref('one');

onMounted(async () => {
    await projectStore.fetchProjects();
});

watch(route, async () => {
    await taskStore.fetchTasks();
    await projectStore.fetchProjects();
});


</script>

<style scoped>

</style>../store/useTaskStore
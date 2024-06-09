<template>
    <v-select
        label="Project"
        v-model="taskStore.selectedProjectId"
        :items="projects"
        item-title="name"
        item-value="id"
        @update:modelValue="taskStore.fetchTasks">
    </v-select>
    <TaskComponent 
        v-for="task in tasks" 
        :key="task.id"
        :task="task">
    </TaskComponent>
</template>

<script setup lang="ts">
import TaskComponent from '../components/TaskComponent.vue';
import { useTaskStore } from '../store/useTaskStore';
import { useProjectStore } from '../store/useProjectStore';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Task from '../model/task';
import Project from '../model/project';

const taskStore = useTaskStore();
const projectStore = useProjectStore();
const loading = ref(true);

const route = useRoute();

const props = defineProps<{ 
    showDone: Boolean
}>()

const tasks = computed<Task[]>(() => {
    if(props.showDone) {
        return taskStore.doneTasks;
    } else {
        return taskStore.todoTasks;
    }
});

const projects = computed<Project[]>(() => {
    const projects: Project[] = [...projectStore.projects];
    const allProject: Project = {
        id: -1,
        name: 'All'
    }
    projects.unshift(allProject)
    return projects;
});

onMounted(async () => {
    loading.value = true;
    await taskStore.fetchTasks();
    loading.value = false;
});

watch(route, async () => {
    loading.value = true;
    await taskStore.fetchTasks();
    await projectStore.fetchProjects();
    loading.value = false;
});


</script>

<style scoped>

</style>
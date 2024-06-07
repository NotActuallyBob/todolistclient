<template>
    <div>
        <TaskCreateComponent></TaskCreateComponent>
        <Suspense>
            <template #default>
                <div>
                    <v-dialog 
                        max-width="500"
                        v-model="editActive">
                        <TaskForm
                            :form-task="taskEdited!"
                            :is-edit="true"
                            @close-dialog="closeAndReload"></TaskForm>
                    </v-dialog>
                    <TaskListComponent 
                        v-for="task in store.tasks" 
                        :key="task.id"
                        :task="task" 
                        @edit="editTask(task)">
                    </TaskListComponent>
                </div>
            </template>
            <template #fallback>
                <div>Loading...</div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type Task from '../model/task';
import TaskListComponent from '../components/TaskListComponent.vue';
import TaskCreateComponent from '../components/TaskCreateComponent.vue';
import TaskForm from '../components/TaskForm.vue';
import { useTaskStore } from '../store/useTaskStore';

const store = useTaskStore();

const editActive = ref<boolean>(false);
const taskEdited = ref<Task | null>(null);

onMounted(async () => {
    await store.fetchTask();
});

function editTask(task: Task) {
    taskEdited.value = task;
    editActive.value = true;
}

function closeAndReload() {
    console.log('closing');
    editActive.value = false;
}

async function deleteTask(id: number) {
    const requestOptions = {
        method: 'DELETE'
    };
    const url :string = 'http://localhost:8080/task/' + id;
    await fetch(url, requestOptions);
    await fetchTask();
    console.log('Deleted ' + id);
}

</script>

<style scoped>

</style>../store/useTaskStore
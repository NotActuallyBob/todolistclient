<template>
    <div>
        <TaskCreateComponent></TaskCreateComponent>
        <Suspense>
            <template #default>
                <div>
                    <v-dialog 
                        max-width="500"
                        v-model="editActive">
                        <v-card title="Edit">
                            <v-text-field v-model="taskEdited!.name">
                            </v-text-field>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                text="Close Dialog"
                                @click="editActive = false"
                                ></v-btn>
                                <v-btn
                                text="Save"
                                @click="saveEditedTask"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <TaskListComponent 
                        v-for="task in tasks" 
                        :task="task" 
                        @edit="editTask(task)"
                        @delete="deleteTask(task.id)">
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

const tasks = ref<Task[]>([]);
const editActive = ref<boolean>(false);
const taskEdited = ref<Task | null>(null);

async function fetchTask() {
    const response = await fetch('http://localhost:8080/task');
    tasks.value = await response.json();
}

onMounted(async () => {
    await fetchTask();
});

function editTask(task: Task) {
    taskEdited.value = task;
    editActive.value = true;
}

async function saveEditedTask() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskEdited.value!)
    };

    const url :string = 'http://localhost:8080/task/' + taskEdited.value!.id;
    await fetch(url, requestOptions);
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

</style>
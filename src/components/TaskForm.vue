<template>
    <v-form ref="form" v-model="valid" @submit.prevent="createForm">
        <v-card title="New Task">
            <v-card-text>
                <v-text-field
                    v-model="newRefTask.name"
                    label="Task Name"
                    :rules="[rules.required]"
                    required
                ></v-text-field>

                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ isActive, props }">
                    <v-text-field
                        v-model="newRefTask.dueDate"
                        label="Due Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="props"
                        :v-on="isActive"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="newRefTask.dueDate" @input="menu = false"></v-date-picker>
                </v-menu>

                <v-select
                    label="Project"
                    v-model="newRefTask.project.id"
                    :items="projectStore.projects"
                    item-title="name"
                    item-value="id"
                ></v-select>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text="Close Dialog"
                    @click="$emit('close-dialog')"
                >
                    Close
                </v-btn>
                <v-btn :disabled="!valid" color="success" @click="createForm">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { addHours } from 'date-fns';
import type Task from '../model/task';
import { useTaskStore } from '../store/useTaskStore';
import { useProjectStore } from '../store/useProjectStore';

const taskStore = useTaskStore();
const projectStore = useProjectStore();


const newTask: Task = {
    id: 0,
    name: '',
    dueDate: new Date(),
    done: false,
    project: {
        id: 0,
        name: ''
    }
}
const newRefTask = ref<Task>(newTask);

const menu = ref<boolean>(false);
const valid = ref<boolean>(false);
const rules = {
    required: (value: any) => !!value || 'Required.'
};


async function createForm() {
    newRefTask.value.dueDate = addHours(newRefTask.value.dueDate, 3);
    
    if (valid.value) {
        await taskStore.createTask(newRefTask.value);
        newRefTask.value.name = '';
        newRefTask.value.dueDate = new Date();
        newRefTask.value.done = false;
        newRefTask.value.project.id = 0;
        newRefTask.value.project.name = '';
    }
}

</script>

<style scoped>

</style>
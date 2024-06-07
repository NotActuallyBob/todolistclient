<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="New Task"
            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
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
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        text="Close Dialog"
                        @click="isActive.value = false"
                        ></v-btn>
                        
                        <v-btn :disabled="!valid" color="success" @click="submitForm">
                            Submit
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-form>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type task from '../model/task';

const menu = ref<boolean>(false);
const valid = ref<boolean>(false);

const newTask: task = {
    id: 0,
    name: '',
    dueDate: new Date(),
    done: false
}
const newRefTask = ref<task>(newTask);

const rules = {
    required: (value: any) => !!value || 'Required.'
};

async function submitForm() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRefTask.value!)
    };
    if (valid.value) {
        const url :string = 'http://localhost:8080/task';
        await fetch(url, requestOptions);
    }
}
</script>
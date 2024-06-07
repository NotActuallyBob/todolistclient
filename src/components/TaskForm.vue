<template>
    <v-form ref="form" v-model="valid" @submit.prevent="createForm">
        <v-card title="New Task">
            <v-card-text>
                <v-text-field
                    v-model="formTask.name"
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
                        v-model="formTask.dueDate"
                        label="Due Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="props"
                        :v-on="isActive"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="formTask.dueDate" @input="menu = false"></v-date-picker>
                </v-menu>
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

const store = useTaskStore();

const emit = defineEmits<{ (e: 'close-dialog'): void }>();

const props = defineProps<{ 
  formTask: Task,
  isEdit: boolean
}>()


const menu = ref<boolean>(false);
const valid = ref<boolean>(false);
const rules = {
    required: (value: any) => !!value || 'Required.'
};


async function createForm() {
    props.formTask.dueDate = addHours(props.formTask.dueDate, 3);

    const requestOptionsCreate = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props.formTask)
    };

    const requestOptionsEdit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props.formTask)
    };
    
    if (valid.value) {
        console.log('Save');
        
        if(props.isEdit) {
            console.log('edit')
            await store.editTask(props.formTask.id, props.formTask);
        } else {
            await store.createTask(props.formTask);
        }
        
        console.log('emitting');
        emit('close-dialog');
    }
}

</script>

<style scoped>

</style>
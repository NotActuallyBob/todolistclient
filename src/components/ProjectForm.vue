<template>
    <v-form ref="form" v-model="valid" @submit.prevent="createForm">
        <v-card title="New Project">
            <v-card-text>
                <v-text-field
                    v-model="newRefProject.name"
                    label="Task Name"
                    :rules="[rules.required]"
                    required
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" color="success" @click="createForm">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type Project from '../model/project';
import { useProjectStore } from '../store/useProjectStore';

const store = useProjectStore();


const newProject: Project = {
    id: 0,
    name: ''
}
const newRefProject = ref<Project>(newProject);

const valid = ref<boolean>(false);
const rules = {
    required: (value: any) => !!value || 'Required.'
};


async function createForm() {
    if (valid.value) {
        await store.createProject(newRefProject.value);
        newRefProject.value.name = '';
    }
}

</script>

<style scoped>

</style>
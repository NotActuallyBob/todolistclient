<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="thistask!.name" @update:focused="save">
                <template v-slot:prepend>
                    <v-icon v-if="thistask!.done" icon="mdi-radiobox-marked" @click="setUndone" />
                    <v-icon v-else icon="mdi-radiobox-blank" @click="setDone" />
                </template>
            </v-text-field>
        </v-card-title>
        <v-card-subtitle>
            <span v-if="thistask!.dueDate < new Date()">WAS DUE</span>
            <span v-else>is due</span>
            {{ thistask!.dueDate.getFullYear() }} - {{ thistask!.dueDate.getMonth() }} - {{ thistask!.dueDate.getDate() }}
        </v-card-subtitle>
    </v-card>
</template>

<script async setup lang="ts">
import { ref } from 'vue';
import type task from '../model/task';

const props = defineProps<{ 
  id: string
}>()

const thistask = ref<task>();

async function fetchTask() {
    const response = await fetch('http://localhost:8080/task/' + props.id);
    const data = await response.json();
    data.dueDate = new Date(data.dueDate);
    thistask.value = await data as task;
}

async function setDone() {
    thistask!.value!.done = true;
    await save();
}

async function setUndone() {
    thistask!.value!.done = false;
    await save();
}

async function save() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(thistask.value!)
    };

    const url :string = 'http://localhost:8080/task/' + thistask.value!.id;
    console.log(url);
    await fetch(url, requestOptions);
}

await fetchTask();

</script>

<style scoped>

</style>
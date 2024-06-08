<template>
    <div v-if="task == undefined || loading"></div>
    <div v-else>
        <v-form ref="form" v-model="valid" @submit.prevent="edit">
            <v-card title="New Task">
                <v-card-text>
                    <v-text-field
                        v-model="task!.name"
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
                            v-model="task!.dueDate"
                            label="Due Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="props"
                            :v-on="isActive"
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="task!.dueDate" @input="menu = false"></v-date-picker>
                    </v-menu>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="success" @click="edit">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTaskStore } from '../store/useTaskStore';
import { useRoute } from 'vue-router';
import Task from '../model/task';

const route = useRoute();
const store = useTaskStore();
const task = ref<Task | undefined>();
const loading = ref<boolean>(true);
const menu = ref<boolean>(false);
const valid = ref<boolean>(false);
const rules = {
    required: (value: any) => !!value || 'Required.'
};

async function edit() {
    await store.editTask(task.value!.id, task.value!);
}

onMounted(async () => {
    loading.value = true;
    task.value = await store.fetchTask(Number(route.params.taskId))
    loading.value = false;
});



</script>

<style scoped>

</style>
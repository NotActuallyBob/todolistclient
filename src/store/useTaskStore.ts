import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import Task from '../model/task';

export const useTaskStore = defineStore('task', () => {
    const url = import.meta.env.VITE_API_URL + 'task';

    const tasks = ref<Task[]>([])
    
    const doubleCount = computed(() => 2 * 2)
    const todoTasks = computed(() => tasks.value.filter(x => x.done === false))
    const doneTasks = computed(() => tasks.value.filter(x => x.done === true))

    async function fetchTask(id: number): Promise<Task | undefined> {
      const index = tasks.value.findIndex(x => x.id === id);
      if(index != -1) {
        return tasks.value[index];
      }

      const response = await fetch(url + '/' + id);
      if(response.ok) {
        const data = await response.json();
      
        const task: Task = {
          ...data,
          dueDate: new Date(data.dueDate)
        }

        return task;
      }
      
      return undefined;
    }

    async function fetchTasks() {
      const response = await fetch(url);
      const data = await response.json();
      
      tasks.value = data.map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate)
      }));
    }

    async function createTask(task: Task) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      
      if(response.ok) {
        const data = await response.json();
        
        tasks.value.push({
          ...data,
          dueDate: new Date(data.dueDate)
        });
      }
    }

    async function deleteTask(id: number) {
      const index = tasks.value.findIndex(x => x.id === id);
      if(index != -1) {
        tasks.value.splice(index, 1);
      }

      const delteUrl :string = url + '/' + id;
      await fetch(delteUrl, {method: 'DELETE'});
    }

    async function editTask(id: number, task: Task) {
      const editUrl: string = url + '/' + id;
      await fetch(editUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    }
  
    return { tasks, doubleCount, fetchTasks, deleteTask, editTask, createTask, fetchTask, todoTasks, doneTasks }
})
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import Task from '../model/task';

export const useTaskStore = defineStore('tasks', () => {
    const taskUrl = import.meta.env.VITE_API_URL + 'tasks';
    const projectUrl = import.meta.env.VITE_API_URL + 'projects';

    const selectedProjectId = ref<number>(-1);
    const tasks = ref<Task[]>([])
    
    const doubleCount = computed(() => 2 * 2)
    const todoTasks = computed(() => tasks.value.filter(x => x.done === false))
    const doneTasks = computed(() => tasks.value.filter(x => x.done === true))

    async function fetchTask(id: number): Promise<Task | undefined> {
      const index = tasks.value.findIndex(x => x.id === id);
      if(index != -1) {
        return tasks.value[index];
      }

      const response = await fetch(taskUrl + '/' + id);
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

    function sortTasks() {
      tasks.value.sort(function(x, y) {
        if (x.dueDate < y.dueDate) {
          return -1;
        }
        if (x.dueDate > y.dueDate) {
          return 1;
        }
        return 0;
      });
    }

    async function fetchTasks() {
      if(selectedProjectId.value === -1) {
        console.log(taskUrl);
        const response = await fetch(taskUrl);
        const data = await response.json();
        
        tasks.value = data.map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate)
        }));

        sortTasks();
      } else {
        const response = await fetch(projectUrl + '/' + selectedProjectId.value + '/tasks');
        console.log(projectUrl + '/' + selectedProjectId.value + '/tasks');
        const data = await response.json();
        
        tasks.value = data.map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate)
        }));

        sortTasks();
      }
    }

    async function createTask(task: Task) {
      const response = await fetch(taskUrl, {
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
        sortTasks();
      }
    }

    async function deleteTask(id: number) {
      const index = tasks.value.findIndex(x => x.id === id);
      if(index != -1) {
        tasks.value.splice(index, 1);
      }

      const delteUrl :string = taskUrl + '/' + id;
      await fetch(delteUrl, {method: 'DELETE'});
    }

    async function editTask(id: number, task: Task) {
      const editUrl: string = taskUrl + '/' + id;
      await fetch(editUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    }
  
    return { tasks, selectedProjectId, doubleCount, fetchTasks, deleteTask, editTask, createTask, fetchTask, todoTasks, doneTasks }
})
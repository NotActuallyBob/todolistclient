import { defineStore } from 'pinia'
import { ref } from 'vue';
import Project from '../model/project';

export const useProjectStore = defineStore('projects', () => {
    const url = '/api/projects';

    const projects = ref<Project[]>([])

    async function fetchProjects() {
        const response = await fetch(url);
        const data = await response.json();

        projects.value = data;
    }

    async function createProject(project: Project) {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project)
        });
        
        if(response.ok) {
          const data = await response.json();
          
          projects.value.push(data);
        }
    }
  
    return { projects, fetchProjects, createProject }
})
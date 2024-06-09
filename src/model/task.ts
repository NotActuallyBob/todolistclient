import Project from "./project";

export default interface Task {
    id: number,
    name: string,
    notes: string,
    done: boolean,
    dueDate: Date,
    project: Project
}
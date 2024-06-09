import Project from "./project";

export default interface Task {
    id: number,
    name: string,
    done: boolean,
    dueDate: Date,
    project: Project
}
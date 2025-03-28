export default class TaskModel {
    tasks = [];

    constructor(tasks) {
        this.tasks = tasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }
}
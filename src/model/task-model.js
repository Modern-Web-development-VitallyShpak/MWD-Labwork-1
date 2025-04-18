import { StatusToColumnMap } from '../const.js';

export default class TaskModel {
    tasks = [];
    observers = [];

    get tasks() {
        return this.tasks;
    }

    constructor(tasks) {
        this.tasks = tasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    addTask(task) {
        this.tasks.push(task);
        this.notify();
    }

    clearTrash() {
        this.tasks = this.tasks.filter(task => task.status !== StatusToColumnMap.trash);
        this.notify();
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => observer(this.tasks));
    }
}
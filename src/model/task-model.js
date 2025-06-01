import { StatusToColumnMap } from '../const.js';

export default class TaskModel {
    #tasks = []; 
    observers = [];

    get tasks() {
        return [...this.#tasks];
    }

    constructor(tasks) {
        this.#tasks = tasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    addTask(task) {
        this.#tasks.push(task);
        console.log(`Задача "${task.title}" успешно добавлена.`); 
        this.notify();
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.#tasks.find(task => task.id === taskId);
        if(task) {
            task.status = newStatus;
            this.notify();
        }
    }

    updateTasks(updatedTasks) {
        const otherTasks = this.#tasks.filter(t => 
            !updatedTasks.some(ut => ut.id === t.id)
        );
        
        this.#tasks = [...otherTasks, ...updatedTasks];
        this.notify();
    }

    clearTrash() {
        this.#tasks = this.#tasks.filter(task => task.status !== StatusToColumnMap.trash);
        this.notify();
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => observer(this.tasks)); // Отправляем свежую копию задач
    }
}
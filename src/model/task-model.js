import { StatusToColumnMap } from '../const.js';

export default class TaskModel {
    #tasks = []; // Используем приватное поле для хранения внутренних данных
    observers = [];

    get tasks() {
        return [...this.#tasks]; // Возвращаем копию массива задач
    }

    constructor(tasks) {
        this.#tasks = tasks || [];
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
        const task = this.#tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            this.notify();
            return true;
        }
        return false;
    }

    clearTrash() {
        this.#tasks = this.#tasks.filter(task => task.status !== StatusToColumnMap.trash);
        console.log("Модель очищена")
        console.log(this.#tasks)
        this.notify();
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => observer(this.tasks)); // Отправляем свежую копию задач
    }
}
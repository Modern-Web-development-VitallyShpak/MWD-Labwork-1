import { StatusToColumnMap } from '../const.js';
import Observable from '../framework/observable.js';
import { UserAction } from '../const.js';
import { UpdateType } from '../const.js';
import { generateID } from '../utils.js';

export default class TaskModel extends Observable{
    #tasksApiService = null;
    #tasks = []; 

    constructor({tasksApiService}) {
        super()
        this.#tasksApiService = tasksApiService;
        // this.#tasksApiService.tasks.then((tasks) => {
        //     console.log(tasks);
        // })
        this.init();
    }

    get tasks() {
        return [...this.#tasks];
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#tasks = tasks;
        } catch(err) {
            this.#tasks = [];
            console.log(this.#tasks);
        }
        this._notify(UpdateType.INIT)
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#tasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        }
        catch (err) {
            console.error('Ошибка при добавлении задачи на сервер', err);
            throw err;
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#tasks.find(task => task.id === taskId);
        if(task) {
            const previousStatus = task.status;
            task.status = newStatus;
            try {
                const updateTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updateTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch(err) {
                console.error('Ошибка при обновлении статуса задачи на сервер', err);
                task.status = previousStatus;
                throw err;
            }
            
        }
    }

    updateTasks(updatedTasks) {
        const otherTasks = this.#tasks.filter(t => 
            !updatedTasks.some(ut => ut.id === t.id)
        );
        
        this.#tasks = [...otherTasks, ...updatedTasks];
        this._notify();
    }

    async clearTrash() {
        const trashTasks = this.#tasks.filter(task => task.status === StatusToColumnMap.trash);
        
        try {
            await Promise.all(trashTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
        
            this.#tasks = this.#tasks.filter(task => task.status !== StatusToColumnMap.trash);
            this._notify(UserAction.DELETE_TASK, {status: StatusToColumnMap.trash});
        } catch (err) {
            console.log('Ошибка при удалении задач из корзины на сервере', err);
            throw err;
        }
    }
}
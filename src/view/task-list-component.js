import { AbstractComponent } from '../framework/view/abstract-component.js';
import TaskComponent from './task-component.js';

function createTaskListComponentTemplate() {
    return `<div class="tasks-list"></div>`;
}

export default class TaskListComponent extends AbstractComponent {
    constructor() {
        super();
        this.onDropCallback = null;
    }
    
    get template() {
        return createTaskListComponentTemplate();
    }

    get element() {
        if (!this._element) {
            this._element = super.element;
            this._element.addEventListener('dragover', this.handleDragOver.bind(this));
            this._element.addEventListener('drop', this.handleDrop.bind(this));
            this._element.addEventListener('dragenter', this.handleDragEnter.bind(this));
            this._element.addEventListener('dragleave', this.handleDragLeave.bind(this));
        }
        return this._element;
    }

    handleDragOver(evt) {

    }

    handleDragEnter(evt) {

    }

    handleDragLeave(evt) {

    }

    handleDrop(evt) {

    }


    setOnDropCallback(callback) {
        this.onDropCallback = callback;
    }

    addTask(taskName, status) {
        const taskComponent = new TaskComponent(taskName, status);
        this.element.append(taskComponent.element);
    }

}
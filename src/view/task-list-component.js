import { createElement } from '../framework/render.js';
import TaskComponent from './task-component.js';

function createTaskListComponentTemplate() {
    return `<div class="tasks-list"></div>`;
}

export default class TaskListComponent {
    getTemplate() {
        return createTaskListComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }

    removeElement() {
        this.element = null;
    }

    addTask(taskName, status) {
        const taskComponent = new TaskComponent(taskName, status);
        this.getElement().append(taskComponent.getElement());
    }

}
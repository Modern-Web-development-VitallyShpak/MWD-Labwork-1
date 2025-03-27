import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(taskName, status) {
    return `<div class="task task-${status}">${taskName}</div>`;
}

export default class TaskComponent {
    constructor(taskName, status) {
        this.taskName = taskName;
        this.status = status
    }

    getTemplate() {
        return createTaskComponentTemplate(this.taskName, this.status);
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
}
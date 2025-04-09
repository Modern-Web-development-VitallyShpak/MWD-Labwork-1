import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(taskName, status) {
    return `<div class="task task-${status}">${taskName}</div>`;
}

export default class TaskComponent extends AbstractComponent {
    constructor(taskName, status) {
        super();
        this.taskName = taskName;
        this.status = status
    }

    get template() {
        return createTaskComponentTemplate(this.taskName, this.status);
    }

    get element() {
        return super.element;
    }
}
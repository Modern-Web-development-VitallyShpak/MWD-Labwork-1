import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(taskName, status) {
    return `<div class="task task-${status}">${taskName}</div>`;
}

export default class TaskComponent extends AbstractComponent {
    constructor(taskName, status, id) {
        super();
        this.taskName = taskName;
        this.status = status
        this.id = id
    }

    get template() {
        return createTaskComponentTemplate(this.taskName, this.status, this.id);
    }

    get element() {
        if (!this._element) {
            this._element = super.element;
        }
        return this._element;
    }

}
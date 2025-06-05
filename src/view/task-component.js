import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(taskName, status) {
    return `<div class="task task-${status}" draggable="true">${taskName}</div>`;
}

export default class TaskComponent extends AbstractComponent {
    constructor(taskName, status, id) {
        super();
        this.taskName = taskName;
        this.status = status
        this.id = id
        this.element.addEventListener('dragstart', this.#handleDragStart.bind(this));
    }

    get template() {
        return createTaskComponentTemplate(this.taskName, this.status);
    }

    get element() {
        return super.element;
    }

    #handleDragStart(evt) {
        evt.dataTransfer.setData('text/plain', this.id);
        evt.dataTransfer.effectAllowed = 'move';
    }

}
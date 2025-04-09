import { AbstractComponent } from '../framework/view/abstract-component.js';
import TaskComponent from './task-component.js';

function createTaskListComponentTemplate() {
    return `<div class="tasks-list"></div>`;
}

export default class TaskListComponent extends AbstractComponent {
    get template() {
        return createTaskListComponentTemplate();
    }

    get element() {
        return super.element;
    }

    addTask(taskName, status) {
        const taskComponent = new TaskComponent(taskName, status);
        this.element.append(taskComponent.element);
    }

}
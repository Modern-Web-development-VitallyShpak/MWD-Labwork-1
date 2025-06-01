import { AbstractComponent } from '../framework/view/abstract-component.js';
import TaskComponent from './task-component.js';

function createTaskListComponentTemplate() {
    return `<div class="tasks-list"></div>`;
}

export default class TaskListComponent extends AbstractComponent {

    #status;

    constructor(status, onTaskDrop) {
        super();
        this.#status = status;
        this.#setDropHandler(onTaskDrop);
    }
    
    get template() {
        return createTaskListComponentTemplate();
    }

    get element() {
        if (!this._element) {
            this._element = super.element;
        }
        return this._element;
    }

    #setDropHandler(onTaskDrop){
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
            const targetTask = event.target.closest('.task');
            if (targetTask) {
                targetTask.classList.add('drop-target');
            }
        });

        container.addEventListener('dragleave', (event) => {
            const targetTask = event.target.closest('.task');
            if (targetTask) {
                targetTask.classList.remove('drop-target');
            }
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const tasks = Array.from(container.querySelectorAll('.task'));
            const targetTask = event.target.closest('.task');
            
            let newIndex;
            if (targetTask) {
                const targetIndex = tasks.indexOf(targetTask);
                newIndex = event.clientY < targetTask.getBoundingClientRect().top + 
                        targetTask.offsetHeight / 2 ? targetIndex : targetIndex + 1;
                targetTask.classList.remove('drop-target');
            } else {
                newIndex = tasks.length;
            }

            onTaskDrop(taskId, this.#status, newIndex);
        });
    }

    addTask(taskName, status) {
        const taskComponent = new TaskComponent(taskName, status);
        this.element.append(taskComponent.element);
    }

}
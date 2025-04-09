import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddTaskFormComponentTemplate() {
    return (
        `<section class="section-new-task">
            <h2>Новая задача</h2>
            <div class="task-input">
                <input type="text" placeholder="Название задачи..." />
                <button class="button-add">+ Добавить</button>
            </div>
        </section>`
    );
}

export default class AddTaskFormComponent extends AbstractComponent {
    get template() {
        return createAddTaskFormComponentTemplate();
    }

    get element() {
        return super.element;
    }
}
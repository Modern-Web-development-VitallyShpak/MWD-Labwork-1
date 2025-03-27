import { createElement } from '../framework/render.js';

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

export default class AddTaskFormComponent {

    getTemplate() {
        return createAddTaskFormComponentTemplate();
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
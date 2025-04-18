import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddTaskFormComponentTemplate() {
    return `
        <section class="section-new-task">
            <h2>Новая задача</h2>
            <form class="task-input-form">
                <input 
                    type="text" 
                    class="task-input__field" 
                    placeholder="Название задачи..." 
                    required
                />
                <button type="submit" class="button-add">
                    + Добавить
                </button>
            </form>
        </section>
    `;
}

export default class AddTaskFormComponent extends AbstractComponent {
    get template() {
        return createAddTaskFormComponentTemplate();
    }

    get element() {
        return super.element;
    }

    setSubmitHandler(handler) {
        this.element.querySelector('form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            const input = this.element.querySelector('input');
            const taskTitle = input.value.trim();
            if (taskTitle) {
                handler(taskTitle);
                input.value = '';
            }
        });
    }
}
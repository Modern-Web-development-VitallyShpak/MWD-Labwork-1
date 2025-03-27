import { createElement } from '../framework/render.js';

function createBoardTaskComponentTemplate() {
    return (
        `<section class="section-tasks">
            <div class="column-tasks column-backlog">
                <div class="column-label label-backlog">
                    <h3>Бэклог</h3>
                </div>
                <div class="tasks-list column-backlog"></div>
            </div>
            <div class="column-tasks column-in-progress">
                <div class="column-label label-in-progress">
                    <h3>В процессе</h3>
                </div>
                <div class="tasks-list column-in-progress"></div>
            </div>
            <div class="column-tasks column-done">
                <div class="column-label label-done">
                    <h3>Готово</h3>
                </div>
                <div class="tasks-list column-done"></div>
            </div>
            <div class="column-tasks column-trash">
                <div class="column-label label-trash">
                    <h3>Корзина</h3>
                </div>
                <div class="tasks-list column-trash"></div>
                <button class="button-clear">× Очистить</button>
            </div>
        </section>`
    );
}

export default class BoardTaskComponent {
    getTemplate() {
        return createBoardTaskComponentTemplate();
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
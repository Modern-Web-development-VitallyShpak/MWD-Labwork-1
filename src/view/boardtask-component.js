import { AbstractComponent } from '../framework/view/abstract-component.js';

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

export default class BoardTaskComponent extends AbstractComponent {
    get template() {
        return createBoardTaskComponentTemplate();
    }

    get element() {
        return super.element;
    }
}
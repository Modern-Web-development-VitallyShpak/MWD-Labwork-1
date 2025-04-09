import { AbstractComponent } from '../framework/view/abstract-component.js';

function getEmptyStateTemplate() {
    return '<div class="empty-state" >Добавьте новую задачу в этот статус'
}

export default class EmptyStateComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return getEmptyStateTemplate();
    }

    get element() {
        return super.element;
    }
}
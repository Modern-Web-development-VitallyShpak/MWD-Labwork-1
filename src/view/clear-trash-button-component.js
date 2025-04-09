import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class ClearTrashButtonComponent extends AbstractComponent {
    element = null;
    handleClick = null;

    constructor({ onClick }) {
        this.handleClick = onClick;
        this.element = this.createElement();
    }

    get template() {
        return '<button class="clear-trash-button">Clear Trash</button>';
    }

    get element() {
        return super.element;
    }

    onClick = (evt) => {
        evt.preventDefault();
        this.handleClick();
    };

    get element() {
        if (!this._element) {
            this._element = super.element;
            this._element.addEventListener('click', this.onClick);
        }
        return this.element;
    }
}
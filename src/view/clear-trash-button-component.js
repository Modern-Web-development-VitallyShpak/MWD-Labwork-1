export default class ClearTrashButtonComponent {
    element = null;
    handleClick = null;

    constructor({ onClick }) {
        this.handleClick = onClick;
        this.element = this.createElement();
    }

    createElement() {
        const element = document.createElement('button');
        element.className = 'clear-trash-button';
        element.textContent = 'Clear Trash';
        element.addEventListener('click', this.handleClick);
        return element;
    }

    getElement() {
        return this.element;
    }
}
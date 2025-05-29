import BoardTaskComponent from '../view/boardtask-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyStateComponent from '../view/empty-state-component.js';
import { render } from '../framework/render.js';
import { StatusToColumnMap } from '../const.js';

export default class TasksBoardPresenter {
    boardContainer = null;
    boardComponent = null;
    taskModel = null;
    taskLists = {};

    constructor(boardContainer, taskModel) {
        this.boardContainer = boardContainer;
        this.taskModel = taskModel;
        this.taskModel.addObserver(this.handleModelChange.bind(this));
    }

    init() {
        this.renderBoard();
    }

    handleModelChange() {
        this.renderBoard()
        const clearButton = this.boardContainer.querySelector('.button-clear');
        if (clearButton) {
            clearButton.disabled = this.taskModel.getTasksByStatus('trash').length === 0;
        }
    }

    renderBoard() {
        if (this.boardContainer.querySelector('.section-tasks')) {
            this.boardContainer.querySelector('.section-tasks').remove();
        }
        
        this.boardComponent = new BoardTaskComponent();
        render(this.boardComponent, this.boardContainer);

        const clearButton = this.boardComponent.element.querySelector('.button-clear');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.taskModel.clearTrash();
            });
        }

        Object.keys(StatusToColumnMap).forEach(status => {
            this.renderTasksList(status);
        });

        this.updateClearButtonState();
    }

    renderTasksList(status) {
        const listContainer = this.boardComponent.element.querySelector(`.column-${status} .tasks-list`);
        if (!listContainer) return;

        const tasksListComponent = new TaskListComponent();
        render(tasksListComponent, listContainer);
        this.taskLists[status] = tasksListComponent;

        tasksListComponent.setOnDropCallback((taskId, newStatus) => {
            this.taskModel.updateTaskStatus(taskId, newStatus);
        });

        const tasks = this.taskModel.getTasksByStatus(status);

        if (tasks.length > 0) {
            tasks.forEach(task => {
                this.renderTask(task, tasksListComponent.element, status);
            });
        } else {
            this.renderEmptyState(listContainer, status);
        }
    }

    renderTrashList() {
        const trashStatus = StatusToColumnMap.trash;
        const columnContainer = this.boardComponent.element.querySelector(`.column-${trashStatus} .tasks-list`);
        if (!columnContainer) return;

        const listContainer = columnContainer.querySelector('.tasks-list');
        const clearButton = columnContainer.querySelector('.button-clear');
        listContainer.innerHTML = '';
        const trashListComponent = new TaskListComponent();
        render(trashListComponent, listContainer);
        this.taskLists[trashStatus] = trashListComponent;
        clearButton.disabled = trashTasks.length === 0;
        const trashTasks = this.taskModel.getTasksByStatus(trashStatus);
        if (trashTasks.length > 0) {
            trashTasks.forEach(task => {
                this.renderTask(task, trashListComponent.element, trashStatus);
            });
        } else {
            this.renderEmptyState(listContainer, trashStatus, true);
        }
    }

    renderTask(task, container, status) {
        const taskComponent = new TaskComponent(task.title, status, task.id);
        render(taskComponent, container);
    }

    renderEmptyState(container, status, isTrash = false) {
        const emptyStateComponent = new EmptyStateComponent({
            status: status,
            isTrash: isTrash
        });
        render(emptyStateComponent, container);
    }

    updateClearButtonState() {
        const clearButton = this.boardComponent.element.querySelector('.button-clear');
        if (clearButton) {
            clearButton.disabled = this.taskModel.getTasksByStatus('trash').length === 0;
        }
    }
}
import BoardTaskComponent from '../view/boardtask-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyStateComponent from '../view/empty-state-component.js';
import { render } from '../framework/render.js';
import { StatusToColumnMap } from '../const.js';

export default class TasksBoardPresenter {
    boardContainer;
    boardComponent;
    _taskModel;
    taskLists = {};

    constructor(boardContainer, taskModel) {
        this.boardContainer = boardContainer;
        this._taskModel = taskModel;
        this._taskModel.addObserver(this.handleModelChange.bind(this));
    }

    init() {
        this.renderBoard();
    }

    handleModelChange() {
        this.renderBoard()
        const clearButton = this.boardContainer.querySelector('.button-clear');
        if (clearButton) {
            clearButton.disabled = this._taskModel.getTasksByStatus('trash').length === 0;
        }
    }

    #handleTaskDrop = (taskId, newStatus,  newIndex) => {
        this._taskModel.updateTaskStatus(taskId, newStatus);

        const task = this._taskModel.tasks.find(t => t.id === taskId);
        
        if (!task) return;
        
        const targetTasks = this._taskModel.tasks
            .filter(t => t.status === newStatus)
            .filter(t => t.id !== taskId); 
        
        if (newIndex >= 0 && newIndex <= targetTasks.length) {
            targetTasks.splice(newIndex, 0, { ...task, status: newStatus });
        } else {
            targetTasks.push({ ...task, status: newStatus });
        }
        
        targetTasks.forEach((t, index) => {
            t.order = index; 
        });
        
        this._taskModel.updateTasks(targetTasks);
    };

    renderBoard() {
        if (this.boardContainer.querySelector('.section-tasks')) {
            this.boardContainer.querySelector('.section-tasks').remove();
        }
        
        this.boardComponent = new BoardTaskComponent();
        render(this.boardComponent, this.boardContainer);

        const clearButton = this.boardComponent.element.querySelector('.button-clear');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this._taskModel.clearTrash();
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

        const tasksListComponent = new TaskListComponent(status, this.#handleTaskDrop);
        render(tasksListComponent, listContainer);
        this.taskLists[status] = tasksListComponent;

        const tasks = this._taskModel.getTasksByStatus(status);

        tasksListComponent.element.innerHTML = '';

        if (tasks.length > 0) {
            tasks.forEach(task => {
                this.renderTask(task, tasksListComponent.element, status);
            });
        } else {
            this.renderEmptyState(tasksListComponent.element, status);
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
            clearButton.disabled = this._taskModel.getTasksByStatus('trash').length === 0;
        }
    }
    
}
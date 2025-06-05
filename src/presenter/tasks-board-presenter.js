import BoardTaskComponent from '../view/boardtask-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyStateComponent from '../view/empty-state-component.js';
import { render } from '../framework/render.js';
import { StatusToColumnMap } from '../const.js';
import { UpdateType } from '../const.js';
import LoadingViewComponent from '../view/LoadingViewComponent.js';

export default class TasksBoardPresenter {
    boardContainer;
    boardComponent;
    #tasksModel;
    taskLists = [];
    #isLoading = true;

    constructor(boardContainer, taskModel) {
        this.boardContainer = boardContainer;
        this.#tasksModel = taskModel;
        this.#tasksModel.addObserver(this.handleModelChange.bind(this));
    }

    async init() {
        try {
            this.#isLoading = true;
            await this.#tasksModel.init();
        } finally {
            this.#isLoading = false;
            this.renderBoard();
        }
    }

    handleModelChange(updateType) {
        if(updateType === UpdateType.INIT) {
            this.#isLoading = false;
        }
        this.renderBoard()
        const clearButton = this.boardContainer.querySelector('.button-clear');
        
        if (clearButton) {
            clearButton.disabled = this.#tasksModel.getTasksByStatus('trash').length === 0;
        }
    }

    #handleTaskDrop = (taskId, newStatus,  newIndex) => {
        this.#tasksModel.updateTaskStatus(taskId, newStatus);

        const task = this.#tasksModel.tasks.find(t => t.id === taskId);
        
        if (!task) return;
        
        const targetTasks = this.#tasksModel.tasks
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
        
        this.#tasksModel.updateTasks(targetTasks);
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
                this.#tasksModel.clearTrash();
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

        tasksListComponent.element.innerHTML = '';

        if(this.#isLoading){
            const LoadingComponent = new LoadingViewComponent();
            render(LoadingComponent, tasksListComponent.element);//
        } else {
            const tasks = this.#tasksModel.getTasksByStatus(status);
            if (tasks.length > 0) {
                tasks.forEach(task => {
                    this.renderTask(task, tasksListComponent.element, status);
                });
            } else {
                this.renderEmptyState(tasksListComponent.element, status);
            }
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
            clearButton.disabled = this.#tasksModel.getTasksByStatus('trash').length === 0;
        }
    }
    
}
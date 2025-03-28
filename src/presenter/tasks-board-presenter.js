import BoardTaskComponent from '../view/boardtask-component.js';
import TaskListComponent from '../view/task-list-component.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
    boardContainer = null;
    boardComponent = null;
    taskModel = null;
    taskLists = {};

    constructor(boardContainer, taskModel) {
        this.boardContainer = boardContainer;
        this.taskModel = taskModel;
    }

    init() {
        this.renderBoard();
        this.renderTaskLists();
        this.renderTasks();
    }

    renderBoard() {
        this.boardComponent = new BoardTaskComponent();
        render(this.boardComponent, this.boardContainer);
    }

    renderTaskLists() {
        const taskboardElement = this.boardComponent.getElement();

        this.taskLists.backlog = new TaskListComponent();
        this.taskLists['in-progress'] = new TaskListComponent();
        this.taskLists.done = new TaskListComponent();
        this.taskLists.trash = new TaskListComponent();

        taskboardElement.querySelector('.column-backlog .tasks-list').append(this.taskLists.backlog.getElement());
        taskboardElement.querySelector('.column-in-progress .tasks-list').append(this.taskLists['in-progress'].getElement());
        taskboardElement.querySelector('.column-done .tasks-list').append(this.taskLists.done.getElement());
        taskboardElement.querySelector('.column-trash .tasks-list').append(this.taskLists.trash.getElement());
    }

    renderTasks() {
        const statuses = ['backlog', 'in-progress', 'done', 'trash'];

        statuses.forEach(status => {
            const tasks = this.taskModel.getTasksByStatus(status);
            tasks.forEach(task => {
                this.taskLists[status].addTask(task.title, task.status, task.id);
            });
        });
    }
}
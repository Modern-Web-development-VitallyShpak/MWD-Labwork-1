import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import { render, RenderPosition } from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { tasks } from './mock/task.js'; // Импортируем задачи из файла
import TaskModel from './model/task-model.js';

const bodyContainer = document.querySelector('body');
const boardAppInnerContainer = document.querySelector('.board-app__inner');

const headerComponent = new HeaderComponent();
const formComponent = new AddTaskFormComponent();

render(headerComponent, bodyContainer, RenderPosition.AFTERBEGIN);
render(formComponent, boardAppInnerContainer);

const taskModel = new TaskModel(tasks);
const tasksBoardPresenter = new TasksBoardPresenter(boardAppInnerContainer, taskModel);
tasksBoardPresenter.init();
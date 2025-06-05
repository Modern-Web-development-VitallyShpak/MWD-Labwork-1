import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import { render, RenderPosition } from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';


const bodyContainer = document.querySelector('body');
const boardAppInnerContainer = document.querySelector('.board-app__inner');

const headerComponent = new HeaderComponent();
const formComponent = new AddTaskFormComponent();

render(headerComponent, bodyContainer, RenderPosition.AFTERBEGIN);
render(formComponent, boardAppInnerContainer);


const END_POINT = 'https://6814a072225ff1af162978fb.mockapi.io';
const taskModel = new TaskModel({
    tasksApiService: new TasksApiService(END_POINT)
});
const tasksBoardPresenter = new TasksBoardPresenter(boardAppInnerContainer, taskModel);
tasksBoardPresenter.init();

formComponent.setSubmitHandler((taskTitle) => {
    taskModel.addTask(taskTitle);
});

try{
    const clearTrashButton = boardAppInnerContainer.querySelector('.button-clear');
    clearTrashButton.disabled = taskModel.getTasksByStatus('trash').length === 0;

    clearTrashButton.addEventListener('click', () => {
        taskModel.clearTrash();
    });
}
catch{}
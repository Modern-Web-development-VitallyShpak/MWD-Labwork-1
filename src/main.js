import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import BoardTaskComponent from './view/boardtask-component.js';
import TaskListComponent from './view/task-list-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('body');
const boardAppInnerContainer = document.querySelector('.board-app__inner');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const formComponent = new AddTaskFormComponent();
render(formComponent, boardAppInnerContainer);

const boardComponent = new BoardTaskComponent();
render(boardComponent, boardAppInnerContainer);

const backlogList = new TaskListComponent();
const inProgressList = new TaskListComponent();
const doneList = new TaskListComponent();
const trashList = new TaskListComponent();

const taskboardElement = boardComponent.getElement();
taskboardElement.querySelector('.column-backlog .tasks-list').append(backlogList.getElement());
taskboardElement.querySelector('.column-in-progress .tasks-list').append(inProgressList.getElement());
taskboardElement.querySelector('.column-done .tasks-list').append(doneList.getElement());
taskboardElement.querySelector('.column-trash .tasks-list').append(trashList.getElement());

backlogList.addTask('Выучить JS', 'backlog');
backlogList.addTask('Выучить React', 'backlog');

inProgressList.addTask('Выпить смузи', 'in-progress');
inProgressList.addTask('Попить воды', 'in-progress');

doneList.addTask('Позвонить маме', 'done');
doneList.addTask('Погладить кота', 'done');

trashList.addTask('Сходить погулять', 'trash');
trashList.addTask('Прочитать Войну и Мир', 'trash');
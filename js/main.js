//поиск элементов на странице
const taskInput = document.querySelector('#taskInput'); 
const form = document.querySelector('#form');
const tasksList = document.querySelector('#tasksList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task) {
    renderTask(task);
});

//вызов функции addTask при отправке
form.addEventListener('submit', addTask); 

//вызов функции удаления задачи при клике на крестик
tasksList.addEventListener('click', deleteTask);

//вызов функции выполненной задачи при клике на окошко
tasksList.addEventListener('click', doneButton);

//функция добавления задачи в список
function addTask(event) { 

    //отмена перезагрузки страницы
    event.preventDefault(); 

    //значение из ввода
    const taskText = taskInput.value;

    //объект описание каждой задачи
    const newTask = {
        id: Date.now(),
        text: taskText,
        complete: false,
    }

    tasks.push(newTask);

    saveTask();

    renderTask(newTask);
    
    //очистка поля ввода
    taskInput.value = "";
}

//выполненная задача
function doneButton (event) {
    const doneButton = event.target.closest('.task-button');
    if (doneButton) {
        const img = event.target.closest('.task-button').querySelector('.task-img');

        const taskItem = event.target.closest('.task');
        const id = Number(taskItem.id);

        const task = tasks.find(function(task) {
            if (task.id == id) {
                return true;
            }
        })
        task.complete = !task.complete;

        saveTask();

        img.src = img.src.includes('checknull.svg') ? './img/check.svg' : './img/checknull.svg';
    }
}

//удаление задачи
function deleteTask (event) {
    const deleteButton = event.target.closest('.delete-button');

    if (deleteButton) {
        const taskItem = event.target.closest('.task');

        //id удаляемого элемента 
        const id = Number(taskItem.id);

        //находим его в массиве по id 
        const index = tasks.findIndex(function(task) {
            return task.id === id;
        })

        tasks.splice(index, 1);
        saveTask();

        taskItem.remove();
    }
}

function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    imgSrc = task.complete ? './img/check.svg' : './img/checknull.svg';

    const taskHTML = `<li id="${task.id}" class="task">
                        <div class="task-elements">
                            <button class="task-button" id="task-button">
                                <span><img src="${imgSrc}" alt="" class="task-img"></span>
                            </button>
                            <span class="task-text">${task.text}</span>
                        </div>
                        <button class="delete-button">✕</button>
                    </li>`;

    //добавляем новый элемент в конец списка tasksList
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}


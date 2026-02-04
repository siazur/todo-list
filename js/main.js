//поиск элементов на странице
const taskInput = document.querySelector('#taskInput'); 
const form = document.querySelector('#form');
const tasksList = document.querySelector('#tasksList');

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

    const taskHTML = `<li class="task">
                        <div class="task-elements">
                            <button class="task-button" id="task-button">
                                <span><img src="./img/checknull.svg" alt="" class="task-img"></span>
                            </button>
                            <span class="task-text">${taskText}</span>
                        </div>
                        <button class="delete-button">✕</button>
                    </li>`;

    //добавляем новый элемент в конец списка tasksList
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    
    //очистка поля ввода
    taskInput.value = "";
}

//выполненная задача
function doneButton (event) {
    const doneButton = event.target.closest('.task-button');
    if (doneButton) {
        const img = event.target.closest('.task-button').querySelector('.task-img');
        img.src = img.src.includes('checknull.svg') ? './img/check.svg' : './img/check1.svg';
    }
}

//удаление задачи
function deleteTask (event) {
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
        const taskItem = event.target.closest('.task');
        taskItem.remove();
    }
}



/* Capturando elementos del documento */
const input = document.querySelector(".input-btn input");
const listTasks = document.querySelector(".list-tasks ul");
const message = document.querySelector(".list-tasks");
let tasks = [];

eventListeners();

/* Función para recuperar tareas guardadas en el storage */
function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || []; /* Obtener tareas guardadas en el storage, si no hay tareas se agrega un arreglo vacío para que no sea nulll y así no arroja error por la consola */
        createHTML();
    });

    listTasks.addEventListener('click', deleteTask);
}

/* Función para eliminar tareas del listado de tareas */
function deleteTask(e) {
    if (e.target.tagName === 'SPAN') {
        const deleteId = parseInt(e.target.getAttribute('task-id'));
        tasks = tasks.filter(task => task.id !== deleteId);
        createHTML(); /* Actualizar listado de tareas tras eliminarla */
    }
}

/* Función para eliminar todas las tareas del listado de tareas */
function removeAll() {
    tasks = [];
    createHTML();
}

/* Función para agregar tareas al listado de tareas */
function addTasks(){
    const task = input.value;
    if(task === ''){
        showError('The field is empty...')
        return
    }
    
    const taskObj = {
        task,
        id: Date.now()
    }

    tasks = [...tasks, taskObj]

    createHTML();

    /* Limpiar input tras ingresar tarea */
    input.value = '';
}

function createHTML() {
    clearHTML()
    if (tasks.length > 0) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `
                ${task.task}<span task-id="${task.id}" >X</span>
            `;
            listTasks.appendChild(li);
        });
    }

    sincronizationStorage();
}

/* Función para agregar tareas al storage */
function sincronizationStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearHTML() {
    listTasks.innerHTML = '';
}

/* Función para mostrar errores al agregar tarea en blanco (mensaje dura 2 segundos) */
function showError(error){
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');
    message.appendChild(messageError);
    setTimeout(() => {
        messageError.remove();
    }, 2000);
}


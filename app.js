// Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');

// Load All EventListener
loadEventListeners();

function loadEventListeners() {

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add Task Event
    form.addEventListener('submit', addTask);

    // Remove Task Event
    taskList.addEventListener('click', removeTask);

    // Clear task
    clearBtn.addEventListener('click', clearTask);

    // Filter Task
    filter.addEventListener('keyup', filterTask);
}

// Get Tasks From LS
function getTasks() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {

        // Create Li Item
        const li = document.createElement('li');
        // Add Class
        li.className = 'list-group-item d-flex align-items-center';
        // Create Text Node and Append to Li
        li.appendChild(document.createTextNode(task));
        // Create i Element
        const i = document.createElement('i');
        // Add Class
        i.className = 'icofont-close text-danger mr-auto';
        // Append the i to li
        li.appendChild(i);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask (e) {
    
    if (taskInput.value === '') {
        alert('لطفا تسک خود را وارد نمایید.');
    } else {
        // Create Li Element
        const li = document.createElement('li');
        // Add Class 
        li.className = 'list-group-item d-flex align-items-center';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create i element
        const i = document.createElement('i');
        // Add class
        i.className = 'icofont-close text-danger mr-auto';
        // Append the i to li
        li.appendChild(i);
        // Append li to ul
        taskList.appendChild(li);

        // Store in LS
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = '';

        e.preventDefault();
    }
}

// Store Task
function storeTaskInLocalStorage(task) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {

    if (e.target.classList.contains('icofont-close')) {
        if (confirm('آیا برای حذف تسک مطمئن هستید؟')) {
            e.target.parentElement.remove();
            // Remove From LS
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

// Remove From LS
function removeTaskFromLocalStorage (taskItem) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach (function (task, index) {

        if (taskItem.textContent == task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTask() {
    taskList.innerHTML = '';
    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {

    localStorage.clear();
}

// Filter Task
function filterTask(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.list-group-item').forEach(function (task) {

        const item = task.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.classList.add('d-flex');
        } else {
            task.classList.remove('d-flex');
            task.style.display = 'none';
        }

    });
}
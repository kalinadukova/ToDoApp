const toDoInput = document.querySelector(".todo-add input");
const newToDo = document.querySelector("ul.todo-items");
const addBtn = document.querySelector(".todo-add-btn");
const totalItems = document.querySelector(".output");

let tasks = [];

let renderTask = function (){
    
    newToDo.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        newToDo.innerHTML += 
        `<li data-id=${tasks[i].id}>
        <span class="todoID">${tasks[i].id}.</span>
        <span class="${tasks[i].completed?'completed': ''}">${tasks[i].title}</span>
        <div class="removeTodo"><i class="far fa-trash-alt"></i></div>
        </li>`;
    }


    countTasks();
    toDoInput.value='';
    toDoInput.focus();
}

function addTask(){
    let taskText = toDoInput.value;
    let newId;

    console.dir(toDoInput);

    if (tasks.length === 0){
        newId = 1;
    }
    else{
        newId = tasks[tasks.length-1].id + 1;
    }

    let newTask = {
        "id": newId,
        "title": taskText,
        "completed": false
    };

    tasks = [...tasks, newTask];

    renderTask();
}

function removeTask(e){

    let targetTask;
    if (e.target.classList.contains("fa-trash-alt")){
        targetTask = e.target.parentNode.parentNode;
    }else if( e.target.classList.contains('removeTodo')){
		targetTask = e.target.parentNode;
    }else{
        return;
    }

    let indexDelItem = targetTask.dataset.id*1;

    let index = tasks.findIndex(task => task.id === indexDelItem);

    if (index >= 0){
        tasks.splice(index,1);
    }

    renderTask();
}

function completeTask(e){
    let targetTask;
    if (e.target.tagName === "LI"){
        targetTask = e.target;
    }else if( e.target.tagName === 'SPAN'){
		targetTask = e.target.parentElement;
    }else{
        return;
    }

    let completedIdx = targetTask.dataset.id*1;

    let index = tasks.findIndex(task => task.id === completedIdx);

    tasks[index].completed = !tasks[index].completed;

    renderTask();
}

function countTasks(){
    let counter = tasks.length;
    totalItems.innerHTML = counter;
}

// let tasksURL = "https://jsonplaceholder.typicode.com/todos";
let tasksURL = "http://localhost:3000/todos";

function fetchTasks(url){
	fetch(url)
		.then(response => response.json()).then(
            function (data){
                tasks = data; 
                renderTask();
            }
        )
};

window.addEventListener("DOMContentLoaded",е => fetchTasks(tasksURL));

addBtn.addEventListener("click", addTask);
toDoInput.addEventListener("keyup", e =>{
    if(e.keyCode === 13){
        addTask();
    }
});

newToDo.addEventListener("click", removeTask);
newToDo.addEventListener("click", completeTask);
const toDoInput = document.querySelector(".todo-add input");
const newToDo = document.querySelector("ul.todo-items");
const addBtn = document.querySelector(".todo-add-btn");
const totalItems = document.querySelector(".output");

let tasks = [];

function renderTask(){
    
    newToDo.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        newToDo.innerHTML += `<li data-id=${tasks[i].id}>
        <span>${tasks[i].id}.</span>
        <span>${tasks[i].title}</span>
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

    const indexDelItem = targetTask.dataset.id*1;

    let index = tasks.findIndex(task => task.id === indexDelItem);


    if (index >= 0){
        tasks.splice(index,1);
    }

    renderTask();
}

function completedTask(e){
    
}

function countTasks(){
    let counter=tasks.length;
    totalItems.innerHTML = counter;
}

addBtn.addEventListener("click", addTask);
toDoInput.addEventListener("keyup", e =>{
    if(e.keyCode === 13){
        addTask();
    }
});

newToDo.addEventListener("click", removeTask);
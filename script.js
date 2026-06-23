const input=
document.getElementById(
"taskInput"
);

const addBtn=
document.getElementById(
"addBtn"
);

const taskList=
document.getElementById(
"taskList"
);

const completed=
document.getElementById(
"completedCount"
);

const total=
document.getElementById(
"totalCount"
);

const progress=
document.getElementById(
"progressBar"
);

let tasks=
JSON.parse(
localStorage.getItem(
"tasks"
)
)||[];

function save(){

localStorage.setItem(
"tasks",
JSON.stringify(
tasks
)
);

}

function update(){

const done=
tasks.filter(
t=>t.completed
).length;

completed.textContent=
done;

total.textContent=
tasks.length;

progress.style.width=
tasks.length
?
(done/tasks.length)
*100+"%"
:
"0%";

}

function render(){

taskList.innerHTML="";

tasks.forEach(
(task,index)=>{

const li=
document.createElement(
"li"
);

if(
task.completed
){

li.classList.add(
"completed"
);

}

li.innerHTML=
`
<span>
${task.text}
</span>

<div>

<button class="done">
✓
</button>

<button class="delete">
✕
</button>

</div>
`;

li
.querySelector(
".done"
)
.onclick=()=>{

tasks[index]
.completed=

!tasks[index]
.completed;

save();

render();

};

li
.querySelector(
".delete"
)
.onclick=()=>{

tasks.splice(
index,
1
);

save();

render();

};

taskList.appendChild(
li
);

});

update();

}

function addTask(){

if(
!input.value.trim()
)
return;

tasks.push({

text:
input.value,

completed:
false

});

input.value="";

save();

render();

}

addBtn.onclick=
addTask;

input.addEventListener(
"keypress",
e=>{

if(
e.key==="Enter"
)

addTask();

}
);

render();
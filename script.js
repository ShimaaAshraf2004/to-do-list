const inputTask = document.querySelector(".input-task");
const tasksList = document.querySelector(".taskes");
const addBtn = document.querySelector(".add");
const boxTasks = document.querySelector(".box-taskes");
const tasksCounter = document.querySelector(".tasks-counter");
const tasksCreated = document.querySelector(".tasks-created");
const completedTasks = document.querySelector(".completed-tasks");
let arrayOfTasks = [];

emptyBox();

function addTask() {
    let taskValue = inputTask.value.trim();
    if (taskValue === "") {
        alert("enter your taske!")
    } else {
    const li = document.createElement("li");
    li.innerHTML = `
            <svg
                class="unchecked-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24.000000"
                height="24.000000"
                fill="none"
                customFrame="#000000"
            >
            <rect
                id="check"
                width="24.000000"
                height="24.000000"
                x="0.000000"
                y="0.000000"
                fill="rgb(255,255,255)"
                fill-opacity="0"
            />
            <g id="Layer 1">
                <path id="Vector" />
                <path
                id="Vector"
                d="M11.9643 4.85959C13.3765 4.85959 14.7571 5.27837 15.9313 6.06298C17.1056 6.84758 18.0208 7.96278 18.5612 9.26753C19.1017 10.5723 19.2431 12.008 18.9676 13.3931C18.6921 14.7782 18.012 16.0506 17.0134 17.0492C16.0148 18.0478 14.7424 18.7279 13.3573 19.0034C11.9722 19.2789 10.5365 19.1375 9.23173 18.597C7.92697 18.0566 6.81178 17.1414 6.02717 15.9671C5.24257 14.7929 4.82378 13.4123 4.82378 12.0001C4.8311 10.1086 5.58574 8.29659 6.92326 6.95907C8.26079 5.62155 10.0728 4.8669 11.9643 4.85959ZM11.9643 3.27281C10.2397 3.27986 8.55592 3.7977 7.12543 4.76094C5.69494 5.72419 4.58191 7.08965 3.92683 8.68496C3.27176 10.2803 3.10401 12.0339 3.44478 13.7245C3.78554 15.415 4.61954 16.9667 5.84148 18.1837C7.06342 19.4007 8.61852 20.2283 10.3105 20.5622C12.0024 20.896 13.7553 20.7211 15.348 20.0596C16.9406 19.398 18.3015 18.2794 19.2589 16.845C20.2163 15.4106 20.7272 13.7246 20.7273 12.0001C20.7273 10.851 20.5003 9.71321 20.0595 8.65203C19.6187 7.59086 18.9727 6.62718 18.1585 5.81631C17.3443 5.00544 16.378 4.36334 15.315 3.92686C14.2521 3.49038 13.1134 3.26811 11.9643 3.27281Z"
                fill="rgb(78,168,222)"
                fill-rule="nonzero"
                />
                <path
                id="Vector"
                d="M7.30843 3.51074L1.18215 3.51074L1.18215 0L0 0L0 4.69289L7.30843 4.69289L7.30843 3.51074Z"
                opacity="0"
                fill="rgb(0,99.375,191.25)"
                fill-rule="nonzero"
                transform="matrix(0.707107,-0.707107,0.707107,0.707107,7.78027,12.0275)"
                />
            </g>
            </svg>
            <span class="text">${taskValue}</span>
            <svg
                class="delete-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24.000000"
                height="24.000000"
                fill="none"
                clip-path="url(#clipPath_0)"
                customFrame="url(#clipPath_0)"
            >
            <defs>
                <clipPath id="clipPath_0">
                <rect
                    width="24.000000"
                    height="24.000000"
                    x="0.000000"
                    y="0.000000"
                    rx="4.000000"
                    fill="rgb(255,255,255)"
                />
                </clipPath>
            </defs>
            <rect
                id="trash"
                width="24.000000"
                height="24.000000"
                x="0.000000"
                y="0.000000"
                rx="4.000000"
                fill="rgb(255,255,255)"
                fill-opacity="0"
            />
            <g id="Layer 2">
                <g id="Layer 1">
                <path
                    id="Vector"
                    d="M14.2021 9.98547L12.8716 9.98547L12.8716 15.5073L14.2021 15.5073L14.2021 9.98547Z"
                    fill="rgb(127.5,127.5,127.5)"
                    fill-rule="evenodd"
                />
                <path
                    id="Vector"
                    d="M11.4624 9.98547L10.1318 9.98547L10.1318 15.5073L11.4624 15.5073L11.4624 9.98547Z"
                    fill="rgb(127.5,127.5,127.5)"
                    fill-rule="evenodd"
                />
                <path
                    id="Vector"
                    d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696L14.2868 6.51696C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696L6.63911 6.51696C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418L6.45162 6.54418C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19L15.7867 19C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696L11.547 6.51696C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904L8.68332 17.7904C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123L16.715 7.81123L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z"
                    fill="rgb(127.5,127.5,127.5)"
                    fill-rule="nonzero"
                />
                </g>
            </g>
            </svg>
    `;
    li.classList = "un-checked";
    tasksList.appendChild(li);
    arrayOfTasks.push(li);
    inputTask.value = "";
    tasksCreated.querySelector("span").textContent = arrayOfTasks.length;
    completedTasks.querySelector(".numbers .total-tasks").textContent = arrayOfTasks.length;
    emptyBox();
    }
}

addBtn.addEventListener("click", () =>{
    addTask();
});

inputTask.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        addTask();
    }
});


function emptyBox() {
    if(arrayOfTasks.length === 0) {
        const empytTasks = document.createElement("div");
        empytTasks.classList.add("empyt-tasks", "container");
        empytTasks.innerHTML = `
        <img src="images/empty-tasks.svg" alt="empty-tasks">
        <p>
            <span>You don't have any tasks registered yet</span> <br/>
            <span>Create tasks and organize your to-do items</span>
        </p>
        `;
        boxTasks.appendChild(empytTasks);
    } else {
        const empytTasksBox = document.querySelector(".empyt-tasks");
        if (empytTasksBox) {
            empytTasksBox.remove();
        }
    }
}


console.log(arrayOfTasks);















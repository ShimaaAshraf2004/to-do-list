const addTaskInForm = document.querySelector(".input-container");
const inputTask = document.querySelector(".input-task");
const tasksList = document.querySelector(".tasks");
const addBtn = document.querySelector(".add");
const textOfAddBtn = document.querySelector(".text-add-btn");
const TasksCounter = document.querySelector(".tasks-created-num");
const completedTasks = document.querySelector(".numbers");
let editingTask = null;
let arrayOfTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};

const checkTaskName = (taskName) => {
  if (!taskName) return "please enter your task!";
  if (duplicateName(taskName)) return "This task is duplicated!";
  return "";
};

const duplicateName = (taskName) => {
  return arrayOfTasks.some((task) => task.title === taskName);
};

const totalTasks = () => {
  TasksCounter.textContent = arrayOfTasks.length;
};

const totalcompleteTasks = () => {
  completedTasks.textContent = `${
    arrayOfTasks.filter((task) => task.complete).length
  } of ${arrayOfTasks.length}`;
};

const addTask = (taskName) => {
  let newTask = {
    id: Date.now(),
    title: taskName,
    complete: false,
  };
  arrayOfTasks.push(newTask);
  saveTasks();
  totalTasks();
  totalcompleteTasks();
  renderTask();
};

const createElementTask = (task) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <img class="uncheck-icon" src="${
      task.complete ? "images/check-icon.svg" : "images/uncheck-icon.svg"
    }" alt="${task.complete ? "checked" : "un-checked"}">
      <span class="text">${task.title}</span>
      <div class="task-controls">
      <button type="button" class="edit-btn">
    <svg
      class="edit-icon"
      width="22"
      height="22"
      viewBox="0 0 27 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M8 7H7C6.46957 7 5.96086 7.21071 5.58579 7.58579C5.21071 7.96086 5 8.46957 5 9V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V17"
          stroke="#808080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.385 4.58511C21.7788 4.19126 22.0001 3.65709 22.0001 3.10011C22.0001 2.54312 21.7788 2.00895 21.385 1.61511C20.9912 1.22126 20.457 1 19.9 1C19.343 1 18.8088 1.22126 18.415 1.61511L10 10.0001V13.0001H13L21.385 4.58511Z"
          stroke="#808080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 5L20 8"
          stroke="#808080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </button>
  <button type="button" class="delete-btn">
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
  </button>
  </div>`;
  li.classList = task.complete ? "checked" : "un-checked";
  const deleteBtn = li.querySelector(".delete-btn");
  const editBtn = li.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTask(task.id);
  });
  editBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    inputTask.value = task.title;
    editingTask = task.id;
    textOfAddBtn.textContent = "Update";
  });
  li.addEventListener("click", () => {
    checkTask(task);
  });
  return li;
};

const renderTask = () => {
  tasksList.innerHTML = "";
  if (arrayOfTasks.length > 0) {
    arrayOfTasks.forEach((task) => {
      tasksList.prepend(createElementTask(task));
    });
  } else {
    tasksList.appendChild(emptyBox());
  }
};

const checkTask = (task) => {
  task.complete = !task.complete;
  saveTasks();
  renderTask();
  totalcompleteTasks();
};

const editTask = (taskName) => {
  arrayOfTasks = arrayOfTasks.map((task) => {
    if (task.id === editingTask) {
      return {
        id: task.id,
        title: taskName,
        complete: task.complete,
      };
    }
    return task;
  });
  editingTask = null;
  textOfAddBtn.textContent = "Create";
  saveTasks();
  renderTask();
  inputTask.value = "";
};

const deleteTask = (id) => {
  if (confirm("are you sure to remove this task?")) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id !== id);
    saveTasks();
    renderTask();
    totalTasks();
    totalcompleteTasks();
  }
};

const emptyBox = () => {
  const emptyTasks = document.createElement("div");
  emptyTasks.classList.add("empty-tasks");
  emptyTasks.innerHTML = `
    <img src="images/empty-tasks.svg" alt="empty-tasks">
    <p>
      <span>You don't have any tasks registered yet</span> <br/>
      <span>Create tasks and organize your to-do items</span>
    </p>`;
  return emptyTasks;
};

renderTask();
totalTasks();
totalcompleteTasks();

addTaskInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = inputTask.value.trim();
  const alertMsg = checkTaskName(taskName);
  if (alertMsg) {
    alert(alertMsg);
    return "";
  }
  if (editingTask) {
    editTask(taskName);
  } else {
    addTask(taskName);
  }
  inputTask.value = "";
});

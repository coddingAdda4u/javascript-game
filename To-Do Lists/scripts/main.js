const ul = document.getElementById('list');
const createBtn = document.getElementById('create-btn');
const deleteAllBtn = document.getElementById('delete-btn');
let length = 0;

// Utility function to update the delete-all button state
function updateDeleteAllButtonState() {
    if (ul.children.length === 0) {
        deleteAllBtn.style.cursor = "not-allowed";
        deleteAllBtn.setAttribute('disabled', 'disabled');
    } else {
        deleteAllBtn.style.cursor = "pointer";
        deleteAllBtn.removeAttribute('disabled');
    }
}

// Utility function to handle task deletion
function handleDeleteTask(li, taskNum) {
    const confirmMsg = prompt(`Type ** task_${taskNum} ** to delete the task.`);
    if (confirmMsg === `task_${taskNum}`) {
        li.remove();
        localStorage.removeItem(`task_${taskNum}`);
        updateDeleteAllButtonState();
    }
}

// Utility function to handle task marking
function handleMarkTask(inputValCheck, markBtn, editBtn) {
    inputValCheck.value += " // **Completed** //";
    inputValCheck.style.color = "#000";
    inputValCheck.setAttribute('disabled', 'disabled');
    editBtn.style.display = "none";
    markBtn.setAttribute('disabled', 'disabled');
    markBtn.style.cursor = "not-allowed";
}

// Function to create a new task element
function createTaskElement(taskValue = "", isCompleted = false) {
    length++;
    const li = document.createElement('li');
    li.classList.add("mb-2");

    const liContent = `
    <div class="d-flex justify-content-evenly align-items-center gap-2">
        <span id="task-numbers">${length}</span>
        <input id="task-${length}" type="text" value="${taskValue}" placeholder="Task ${length}" class="form-control" autocomplete="off" title="Task ${length}" ${isCompleted ? "disabled" : ""}>
        <span title="Edit Task"><i class="fa-solid fa-edit" style="cursor: pointer;"></i></span>
        <div class="options me-4">
            <i class="fa-solid fa-ellipsis"></i>
            <div class="options-dropdown">
                <button class="mark-btn" style="--color: #00dd00;" title="Mark as done"><i class="fa-solid fa-check"></i>&nbsp;Mark</button>
                <button class="delete-btn" style="--color: #dd0000;" title="Delete Task"><i class="fa-solid fa-trash"></i>&nbsp;Delete</button>
            </div>
        </div>
    </div>`;
    li.innerHTML = liContent;
    ul.append(li);

    const inputValCheck = li.querySelector(`#task-${length}`);
    const editBtn = li.querySelector('.fa-edit');
    const deleteBtn = li.querySelector('.delete-btn');
    const markBtn = li.querySelector('.mark-btn');

    // Add event listener for the input field
    inputValCheck.addEventListener('change', () => {
        const inputValue = inputValCheck.value.trim();
        if (inputValue !== "") {
            inputValCheck.setAttribute('disabled', 'disabled');
            localStorage.setItem(`task_${length}`, inputValue);
        }
    });

    // Add event listener for the edit button
    editBtn.addEventListener('click', () => {
        if (!confirm("Are you sure you want to edit this task?")) return;
        inputValCheck.removeAttribute('disabled');
        inputValCheck.focus();
    });

    // Add event listener for the delete button
    deleteBtn.addEventListener('click', () => handleDeleteTask(li, length));

    // Add event listener for the mark button
    markBtn.addEventListener('click', () => handleMarkTask(inputValCheck, markBtn, editBtn));

    // Focus on the newly created input
    if (!isCompleted) inputValCheck.focus();
}

// Function to delete all tasks
function deleteAll() {
    const deleteText = "delete_all";
    const deleteConfirm = prompt("Type ** delete_all ** to delete all the tasks.");
    if (deleteConfirm === deleteText) {
        ul.innerHTML = "";
        length = 0;
        localStorage.clear();
        updateDeleteAllButtonState();
    }
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task_')) {
            const taskValue = localStorage.getItem(key);
            createTaskElement(taskValue, true);
        }
    }
    updateDeleteAllButtonState();
}

// Attach event listeners
createBtn.addEventListener('click', () => createTaskElement());
deleteAllBtn.addEventListener('click', deleteAll);

// Initialize
updateDeleteAllButtonState();
loadTasksFromLocalStorage();





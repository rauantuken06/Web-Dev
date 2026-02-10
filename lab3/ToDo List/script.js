const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addTask("First item");
addTask("Second item");
addTask("Third item");

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if(text === "") {
        return;
    }

    addTask(text);
    taskInput.value = "";
    taskInput.focus();
});

taskInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addBtn.click();
    }
});

function addTask(text) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const p = document.createElement("p");
    p.classList.add("task-text");
    p.textContent = text;

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.type = "button";
    delBtn.textContent = "🗑";

    checkbox.addEventListener("change", () => {
        li.classList.toggle("done", checkbox.checked);
    });

    delBtn.addEventListener("click", () => {
        taskList.removeChild(li);
    })

    li.appendChild(checkbox);
    li.appendChild(p);
    li.append(delBtn);

    taskList.appendChild(li);
}
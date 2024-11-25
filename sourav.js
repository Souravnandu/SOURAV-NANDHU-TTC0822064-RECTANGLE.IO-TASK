document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector(".task-input input");
  const addTaskButton = document.querySelector(".add-task-btn");
  const taskCategoryDropdown = document.querySelector("#task-category");

  let taskListContainer = document.querySelector(".task-list");
  if (!taskListContainer) {
    taskListContainer = document.createElement("div");
    taskListContainer.classList.add("task-list");
    document.querySelector(".content").appendChild(taskListContainer);
  }

  // Load tasks from localStorage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ text, category, timestamp }) => {
      createTaskElement(text, category, timestamp);
    });
  };

  // Save tasks to localStorage
  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll(".task").forEach((taskElement) => {
      const text = taskElement.querySelector(".task-text").textContent.trim();
      const category = Array.from(taskElement.classList).find((cls) =>
        ["personal", "freelance", "work", "scheduled"].includes(cls)
      );
      const timestamp = taskElement.querySelector(".task-timestamp").textContent.trim();
      tasks.push({ text, category, timestamp });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Create a task element
  const createTaskElement = (text, category, timestamp = new Date().toLocaleString()) => {
    if (!text.trim()) return;

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", category);

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = text;

    const taskTimestamp = document.createElement("span");
    taskTimestamp.classList.add("task-timestamp");
    taskTimestamp.textContent = `Added on: ${timestamp}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      taskDiv.remove();
      saveTasks();
    });

    taskDiv.append(taskText, taskTimestamp, deleteButton);
    taskListContainer.appendChild(taskDiv);
  };

  // Add a new task
  const addTask = () => {
    const text = taskInput.value.trim();
    const category = taskCategoryDropdown.value;
    if (!text) return alert("Please enter a task.");
    createTaskElement(text, category);
    saveTasks();
    taskInput.value = "";
  };

  // Event listeners
  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Load tasks on page load
  loadTasks();
});

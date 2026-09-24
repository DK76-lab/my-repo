
const input = document.getElementById("taskInput");

const button = document.getElementById("addTaskBtn");

const list = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const filterButtons = document.querySelectorAll(".filter-btn");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

let currentFilter = "all";
// Загружаем сохранённые задачи

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Функция сохранения задач

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


function updateStats() {

    // Количество всех задач

    const total = tasks.length;

    // Количество выполненных задач

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;


    // Обновляем счётчики

    totalTasks.textContent = "Всего: " + total;

    completedTasks.textContent = "Выполнено: " + completed;


    // Вычисляем процент

    let percent = 0;

    if (total > 0) {

        percent = Math.round((completed / total) * 100);

    }


    // Изменяем ширину полоски

    progressBar.style.width = percent + "%";


    // Обновляем текст

    progressText.textContent = percent + "% выполнено";

}

// Функция отображения задач

function renderTasks() {
    
    console.log("Наши задачи:", tasks);

    updateStats();
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
            
// Проверяем выбранный фильтр

if (currentFilter === "active" && task.completed) {
    return;
}

if (currentFilter === "completed" && !task.completed) {
    return;
}
        const newTask = document.createElement("li");

        const text = document.createElement("span");

        text.textContent = task.text;

        text.className = "task-text";


        // Если задача выполнена

        if (task.completed) {

            newTask.classList.add("completed");

        }


        // Кнопка выполнения

        const doneButton = document.createElement("button");

        doneButton.textContent = task.completed ? "Вернуть" : "Готово";

        doneButton.className = "done-btn";


        doneButton.addEventListener("click", function() {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        });


        // Кнопка удаления

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Удалить";

        deleteButton.className = "delete-btn";


        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            renderTasks();

        });
        
// Создаём кнопку редактирования

const editButton = document.createElement("button");

editButton.textContent = "Изменить";

editButton.className = "edit-btn";


// Обрабатываем нажатие

editButton.addEventListener("click", function() {

    // Показываем окно редактирования

    const newText = prompt(
        "Измени текст задачи:",
        task.text
    );

    // Если пользователь нажал «Отмена»

    if (newText === null) {
        return;
    }

    // Убираем лишние пробелы

    const trimmedText = newText.trim();

    // Не разрешаем сохранять пустую задачу

    if (trimmedText === "") {
        alert("Название задачи не может быть пустым!");
        return;
    }

    // Изменяем название задачи

    task.text = trimmedText;

    // Сохраняем изменения

    saveTasks();

    // Обновляем страницу приложения

    renderTasks();

});

        // Собираем задачу

        
        newTask.appendChild(text);

        newTask.appendChild(editButton);

        newTask.appendChild(doneButton);

        newTask.appendChild(deleteButton);

        list.appendChild(newTask);

    });

}


// Добавление новой задачи

button.addEventListener("click", function() {

    const taskText = input.value.trim();

    if (taskText === "") {

        alert("Сначала напиши задачу!");

        return;

    }

    // Добавляем задачу в массив

    tasks.push({

        text: taskText,

        completed: false

    });

    saveTasks();

    renderTasks();

    input.value = "";

});


// Показываем задачи при открытии сайта

renderTasks();

filterButtons.forEach(function(filterButton) {

    filterButton.addEventListener("click", function() {

        // Запоминаем выбранный фильтр

        currentFilter = filterButton.dataset.filter;

        // Убираем выделение со всех кнопок

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        // Выделяем выбранную кнопку

        filterButton.classList.add("active");

        // Обновляем список

        renderTasks();

    });

});

// Добавление задачи нажатием Enter

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        button.click();

    }

});

console.log("Привет!");

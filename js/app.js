(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const toDoListInput = document.querySelector(".addmenu-todolist__input");
    const toDoListButtonAdd = document.querySelector(".addmenu-todolist__cansel");
    const toDoListList = document.querySelector(".todolist__list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    function addTask(taskText) {
        if (toDoListInput === "") return;
        tasks.push({
            text: taskText,
            completed: false
        });
        updateTask();
    }
    function removeTask(index) {
        tasks.splice(index, 1);
        updateTask();
    }
    function moveTaskBackward(index) {
        if (index > 0) {
            const temp = tasks[index];
            tasks[index] = tasks[index - 1];
            tasks[index - 1] = temp;
            updateTask();
            displayTask();
        }
    }
    function moveTaskForward(index) {
        if (index < tasks.length - 1) {
            const temp = tasks[index];
            tasks[index] = tasks[index + 1];
            tasks[index + 1] = temp;
            updateTask();
            displayTask();
        }
    }
    function updateTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTask();
    }
    function displayTask() {
        toDoListList.innerHTML = "";
        tasks.forEach(((element, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("todolist__item");
            listItem.innerHTML = `<div class="todolist__header"><div class="todolist__title">Task</div><div class="todolist__editing"><div class="todolist__date">08.08.2023</div><div class="todolist__edit"><img src="img/task/edit.svg" alt="edit"></div><div class="todolist__close"><img src="img/task/close.svg" alt=""></div></div></div><div class="todolist__text">${element.text}</div><div class="todolist__arrows"><div class="todolist__arrow arrow-top"><img src="img/task/arrow-top.svg" alt=""></div><div class="todolist__arrow arrow-bottom"><img src="img/task/arrow-top.svg" alt=""></div></div>`;
            const removeButton = listItem.querySelector(".todolist__close");
            removeButton.addEventListener("click", (function(e) {
                removeTask(index);
                displayTask();
            }));
            const editButton = listItem.querySelector(".todolist__edit");
            editButton.addEventListener("click", (function(e) {
                const updateTaskText = prompt("Edit task", element.text);
                if (updateTaskText !== null) {
                    tasks[index].text = updateTaskText;
                    updateTask();
                    displayTask();
                }
            }));
            const arrowTop = listItem.querySelector(".arrow-top");
            const arrowBottom = listItem.querySelector(".arrow-bottom");
            arrowTop.addEventListener("click", (function(e) {
                moveTaskBackward(index);
            }));
            arrowBottom.addEventListener("click", (function(e) {
                moveTaskForward(index);
            }));
            toDoListList.appendChild(listItem);
        }));
    }
    displayTask();
    toDoListButtonAdd.addEventListener("click", (function(e) {
        const taskText = toDoListInput.value;
        if (taskText) {
            toDoListInput.value = "";
            addTask(taskText);
        }
    }));
    window["FLS"] = true;
    isWebp();
})();
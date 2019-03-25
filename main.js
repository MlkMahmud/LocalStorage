'use strict';
const slider = document.getElementById('plus');
const textField = document.getElementById('input');
const tasks = document.getElementById('tasks');

// Hide Input Field
slider.onclick = () => {
  textField.classList.toggle('hide');
};

textField.onkeypress = (e) => {
  if (
    e.which === 13 &&
    textField.value !== '' &&
    textField.value.length <= 30
  ) {
    //ADD new Task
    const task = document.createElement('li');
    task.className = 'list';
    const val = textField.value;
    //save new task to Local storage
    localStorage.setItem(val, val);
    task.innerHTML =
      '<span class="delete">X</span>' + localStorage.getItem(val);
    //Cross out completed tasks
    task.addEventListener('click', (e) => {
      task.classList.toggle('done');
    });
    // Append the new task to the page and clear the input field
    tasks.appendChild(task);
    textField.value = '';
    const del = task.children;
    //DELETE completed Tasks
    for (let btn of del) {
      btn.addEventListener('click', function() {
        deleteTask(this);
      });
    }
  }
};

// GET ALL TASKS FROM LOCAL STORAGE ON REFRESH
function refresh() {
  for (let value of Object.keys(localStorage)) {
    const task = document.createElement('li');
    task.className = 'list';
    task.innerHTML =
      '<span class="delete">X</span>' + localStorage.getItem(value);
    task.addEventListener('click', function() {
      task.classList.toggle('done');
    });
    const del = task.children;
    for (let btn of del) {
      btn.addEventListener('click', function() {
        deleteTask(this);
      });
    }
    tasks.appendChild(task);
  }
}

// REMOVE TASK FROM LOCAL STORAGE
function deleteTask(btn) {
  const task = btn.parentElement.innerText.replace(/X/y, '');
  btn.parentElement.style.height = 0;
  btn.parentElement.style.opacity = 0;
  localStorage.removeItem(task);
  setTimeout(() => {
    tasks.removeChild(btn.parentElement);
  }, 500);
}

refresh();

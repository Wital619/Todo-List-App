function createListItem(taskData) {
  const ul = document.getElementsByClassName('todo-list')[0];
  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const removeBtn = document.createElement('span');

  li.className = 'todo-item';

  input.type = 'checkbox';
  input.className = 'todo-input';
  input.id = taskData.taskId;
  input.checked = taskData.inputChecked;
  input.addEventListener('click', doneTask);

  label.className = 'todo-label';
  label.textContent = taskData.labelText;
  label.setAttribute('for', taskData.taskId);

  if (taskData.inputChecked) {
    label.style.textDecoration = 'line-through';
    label.style.color = 'grey';
  } else {
    label.style.textDecoration = 'none';
    label.style.color = 'initial';
  }

  removeBtn.className = 'todo-remove';
  removeBtn.textContent = 'X';
  removeBtn.addEventListener('click', removeTask);

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(removeBtn);
  ul.insertBefore(li, ul.children[0]);
}

function renderTasks() {
  const tasks = getDataFromLS();

  tasks.forEach(task => {
    createListItem(task);
  });
}

function createTask(event) {
  if (event.key === 'Enter' && event.target.value) {

    const data = getDataFromLS();
    let taskId = 0;

    if (data && data.length) {

      const numbers = data.map(task => {
        return +task.taskId.slice(-1);
      });

      taskId = `input${Math.max(...numbers) + 1}`;
    } else {
      taskId = `input1`;
    }

    const taskData = {
      taskId,
      labelText: event.target.value,
      inputChecked: event.target.checked
    };

    createListItem(taskData);
    saveDataToLS(taskData);

    event.target.value = '';
  }
}

function doneTask() {
  const labelStyle = this.nextElementSibling.style;
  let existTodoList = getDataFromLS();

  const taskIndexToEdit = existTodoList.findIndex(task => {
    return task.taskId === this.id;
  });

  if (this.checked) {
    labelStyle.textDecoration = 'line-through';
    labelStyle.color = 'grey';
  } else {
    labelStyle.textDecoration = 'none';
    labelStyle.color = 'initial';
  }

  this.checked = !!this.checked;

  existTodoList[taskIndexToEdit].inputChecked = this.checked;
  setDataToLS(existTodoList);
}

function saveDataToLS(data) {
  let existTodoList = getDataFromLS();

  if (existTodoList) {
    existTodoList.push(data);
  } else {
    existTodoList = [data];
  }

  setDataToLS(existTodoList);
}

function removeTask() {
  const li = this.parentElement;
  li.parentElement.removeChild(li);

  const forAttrValue = this.previousElementSibling.getAttribute('for');
  removeDataFromLS(forAttrValue);
}

function removeDataFromLS(taskId) {
  let existTodoList = getDataFromLS();

  const taskIndexToRemove = existTodoList.findIndex(task => {
    return task.taskId === taskId;
  });

  existTodoList.splice(taskIndexToRemove, 1);
  setDataToLS(existTodoList);
}

function getDataFromLS() {
  return JSON.parse(localStorage.getItem('todoList')) || [];
}

function setDataToLS(data) {
  localStorage.setItem('todoList', JSON.stringify(data));
}
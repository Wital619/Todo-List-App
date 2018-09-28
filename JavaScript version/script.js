/* ===== INITIALIZATIONS =====
         ======================= */

const bottomMenu = document.getElementsByClassName('bottom-menu')[0];
const todoList = document.getElementsByClassName('todo-list')[0];
const itemsCount = document.getElementsByClassName('items-count')[0];
const clearCompletedBtn = document.getElementsByClassName('clear-completed-btn')[0];
const filterButtons = document.getElementsByClassName('filter-btn');
const todoInputs = document.getElementsByClassName('todo-input');
const todoItems = document.getElementsByClassName('todo-item');

let currentFilter = filterButtons[0];

Array.from(filterButtons).forEach(filterButton => {
  filterButton.addEventListener('click', filterTasks);
});


/* ===== MAIN FUNCTIONS =====
         ======================= */

function createListItem(taskData) {
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
    itemsCount.textContent = (++itemsCount.textContent).toString();
  }

  removeBtn.className = 'todo-remove';
  removeBtn.textContent = 'X';
  removeBtn.addEventListener('click', removeTask);

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(removeBtn);
  todoList.insertBefore(li, todoList.children[0]);
}

function createTask(e) {
  if (e.key === 'Enter' && e.target.value) {

    const todoListData = getDataFromLS();
    let taskId = '';

    if (todoListData.length) {
      /* Get the maximum ID and set ID of the new task to maximum ID + 1 */
      const numbers = todoListData.map(task => {
        return +task.taskId.slice(-1);
      });

      taskId = `input${Math.max(...numbers) + 1}`;
    } else {
      taskId = `input1`;
    }

    const taskData = {
      taskId,
      labelText: e.target.value,
      inputChecked: e.target.checked
    };

    if (!Array.from(todoItems).length) {
      bottomMenu.style.display = 'flex';
    }

    createListItem(taskData);
    saveDataToLS(taskData);
    resetFilter();

    e.target.value = '';
  }
}

function doneTask() {
  const isThereCheckedInput = Array.from(todoInputs).some(input => {
    return input.checked;
  });

  clearCompletedBtn.style.display = isThereCheckedInput ? 'block' : 'none';

  const labelStyle = this.nextElementSibling.style;
  let todoListData = getDataFromLS();

  const taskIndexToEdit = todoListData.findIndex(task => {
    return task.taskId === this.id;
  });

  if (this.checked) {
    labelStyle.textDecoration = 'line-through';
    labelStyle.color = 'grey';
    itemsCount.textContent = (--itemsCount.textContent).toString();
  } else {
    labelStyle.textDecoration = 'none';
    labelStyle.color = 'initial';
    itemsCount.textContent = (++itemsCount.textContent).toString();
  }

  this.checked = !!this.checked;

  todoListData[taskIndexToEdit].inputChecked = this.checked;
  setDataToLS(todoListData);

  if (currentFilter !== filterButtons[0]) {
    this.parentElement.style.display = 'none';
  }
}

function removeTask(e) {
  const li = e.target.parentElement;
  todoList.removeChild(li);

  if (!Array.from(todoItems).length) {
    bottomMenu.style.display = 'none';
  }

  if (!li.children[0].checked) {
    itemsCount.textContent = (--itemsCount.textContent).toString();
  }

  const forAttrValue = e.target.previousElementSibling.getAttribute('for');
  removeDataFromLS(forAttrValue);
}

function removeCompletedTasks() {
  Array.from(todoInputs).forEach(input => {
    if (input.checked) {
      todoList.removeChild(input.parentElement);
      removeDataFromLS(input.id);
    }
  });

  if (!Array.from(todoItems).length) {
    bottomMenu.style.display = 'none';
  }

  resetFilter();
}

function renderTasks() {
  const todoListData = getDataFromLS();

  if (todoListData.length) {
    todoListData.forEach(todoItem => {
      createListItem(todoItem);
    });

    const isThereCheckedInput = todoListData.some(todoItem => {
      return todoItem.inputChecked;
    });

    clearCompletedBtn.style.display = isThereCheckedInput ? 'block' : 'none';
    bottomMenu.style.display = 'flex';
  }
}

/* ===== FILTER FUNCTIONS =====
         ======================= */

function filterTasks(e) {
  if (currentFilter === e.target) {
    return;
  }

  currentFilter.classList.remove('selected');
  currentFilter = e.target;
  currentFilter.classList.add('selected');

  switch (e.target.textContent) {
    case 'Active':
      filterActiveItems();
      break;
    case 'Completed':
      filterCompletedItems();
      break;
    case 'All':
    case 'default':
      filterAllItems();
      break;
  }
}


function filterActiveItems() {
  Array.from(todoItems).forEach(item => {
    if (item.children[0].checked) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });
}

function filterAllItems() {
  Array.from(todoItems).forEach(item => {
    item.style.display = 'flex';
  });
}

function filterCompletedItems() {
  Array.from(todoItems).forEach(item => {
    if (!item.children[0].checked) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });
}

function resetFilter() {
  if (currentFilter === filterButtons[0]) {
    return;
  }

  filterButtons[0].classList.add('selected');
  filterButtons[1].classList.remove('selected');
  filterButtons[2].classList.remove('selected');

  currentFilter = filterButtons[0];

  filterAllItems(Array.from(todoItems));
}

/* ===== LOCAL STORAGE FUNCTIONS =====
         ======================= */

function getDataFromLS() {
  return JSON.parse(localStorage.getItem('todoList')) || [];
}

function setDataToLS(data) {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeDataFromLS(taskId) {
  let todoList = getDataFromLS();

  const taskIndexToRemove = todoList.findIndex(task => {
    return task.taskId === taskId;
  });

  todoList.splice(taskIndexToRemove, 1);
  setDataToLS(todoList);
}

function saveDataToLS(data) {
  let todoListData = getDataFromLS();

  if (todoListData.length) {
    todoListData.push(data);
  } else {
    todoListData = [data];
  }

  setDataToLS(todoListData);
}
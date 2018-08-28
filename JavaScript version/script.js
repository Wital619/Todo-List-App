function enterTask(event) {
  if (event.key === 'Enter' && event.target.value) {
    const ul = document.getElementsByClassName('todo-list')[0];
    const li = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const removeBtn = document.createElement('span');
    const inputId = `input${ul.children.length + 1}`;

    li.className = 'todo-item';

    input.type = 'checkbox';
    input.className = 'todo-input';
    input.id = inputId;
    input.addEventListener('click', doneTask);
    input.addEventListener('keyup', doneTask);

    label.className = 'todo-label';
    label.textContent = event.target.value;
    label.setAttribute('for', inputId);

    removeBtn.className = 'todo-remove';
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', removeTask);

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(removeBtn);
    ul.insertBefore(li, ul.children[0]);

    event.target.value = '';
  }
}

function doneTask() {
  const labelStyle = this.nextElementSibling.style;

  if (this.checked) {
    labelStyle.textDecoration = 'line-through';
    labelStyle.color = 'grey';
  } else {
    labelStyle.textDecoration = 'none';
    labelStyle.color = 'initial';
  }

  this.checked = !!this.checked;
}

function removeTask() {
  const li = this.parentElement;
  li.parentElement.removeChild(li);
}
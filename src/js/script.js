// Capturar os elementos do DOM
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('tasks');

// Função para salvar as tarefas no localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(taskItem => {
    const taskText = taskItem.querySelector('span').textContent;
    const isCompleted = taskItem.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renomear a função local `loadTasks` para `loadSavedTasks`
function loadSavedTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="remove-btn">x</button>
    `;

    // Adicionar eventos para os checkboxes e botões
    const completeCheckbox = taskItem.querySelector('.complete-checkbox');
    const removeBtn = taskItem.querySelector('.remove-btn');

    completeCheckbox.addEventListener('change', function () {
      const taskSpan = taskItem.querySelector('span');
      taskSpan.classList.toggle('completed', completeCheckbox.checked);
      saveTasks(); // Atualiza o localStorage
    });

    removeBtn.addEventListener('click', function () {
      taskItem.remove();
      saveTasks(); // Atualiza o localStorage
    });

    taskList.appendChild(taskItem);
  });
}

// Adicionar nova tarefa
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Por favor, insira uma tarefa!');
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <input type="checkbox" class="complete-checkbox">
    <span>${taskText}</span>
    <button class="remove-btn">x</button>
  `;

  // Adicionar eventos para os checkboxes e botões
  const completeCheckbox = taskItem.querySelector('.complete-checkbox');
  const removeBtn = taskItem.querySelector('.remove-btn');

  completeCheckbox.addEventListener('change', function () {
    const taskSpan = taskItem.querySelector('span');
    taskSpan.classList.toggle('completed', completeCheckbox.checked);
    saveTasks();
  });

  removeBtn.addEventListener('click', function () {
    taskItem.remove();
    saveTasks();
  });

  taskList.appendChild(taskItem);
  taskInput.value = '';
  saveTasks(); // Atualiza o localStorage
}

// Eventos
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
    event.preventDefault();
  }
});

// Carregar tarefas salvas ao carregar a página
window.addEventListener('load', loadSavedTasks);

const suggestTaskBtn = document.getElementById('suggest-task-btn');

// Função para buscar uma tarefa da API e evitar duplicatas
function fetchTaskFromAPI() {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      const existingTasks = Array.from(taskList.querySelectorAll('li span')).map(span => span.textContent);

      // Filtrar tarefas incompletas e que não estão na lista atual
      const incompleteTasks = data.filter(task => !task.completed && !existingTasks.includes(task.title));

      if (incompleteTasks.length === 0) {
        alert('Não há novas sugestões de tarefas disponíveis.');
        return;
      }

      // Escolher uma tarefa aleatória
      const randomTask = incompleteTasks[Math.floor(Math.random() * incompleteTasks.length)];

      // Adicionar a tarefa sugerida à lista
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <input type="checkbox" class="complete-checkbox">
        <span>${randomTask.title}</span>
        <button class="remove-btn">x</button>
      `;

      // Adicionar eventos para os checkboxes e botões
      const completeCheckbox = taskItem.querySelector('.complete-checkbox');
      const removeBtn = taskItem.querySelector('.remove-btn');

      completeCheckbox.addEventListener('change', function () {
        const taskSpan = taskItem.querySelector('span');
        taskSpan.classList.toggle('completed', completeCheckbox.checked);
        saveTasks();
      });

      removeBtn.addEventListener('click', function () {
        taskItem.remove();
        saveTasks();
      });

      taskList.appendChild(taskItem);
      saveTasks(); // Atualiza o localStorage
    })
    .catch(error => {
      console.error('Erro ao buscar tarefa da API:', error);
      alert('Não foi possível obter uma sugestão de tarefa. Tente novamente mais tarde.');
    });
}

// Evento para o botão de sugestão de tarefa
suggestTaskBtn.addEventListener('click', fetchTaskFromAPI);

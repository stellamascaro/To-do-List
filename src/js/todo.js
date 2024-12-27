// Definições das funções
export function addTask(name, taskList) {
  const newTask = { id: Date.now(), name, completed: false };
  taskList.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  return newTask;
}

export function loadTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

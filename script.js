const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  const password = document.querySelector('#password');
  const toggle = document.querySelector('.toggle-password');
  const message = document.querySelector('#form-message');

  toggle.addEventListener('click', () => {
    const showing = password.type === 'password';
    password.type = showing ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(showing));
    toggle.setAttribute('aria-label', showing ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = '';
    if (!signupForm.reportValidity()) return;
    if (!/(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password.value)) {
      message.textContent = 'La contraseña debe incluir al menos un número y un símbolo.';
      password.focus();
      return;
    }
    window.location.href = 'tareas.html';
  });

  signupForm.addEventListener('input', () => {
    message.textContent = '';
    message.style.color = '';
  });
}

const newTaskButton = document.querySelector('#new-task');
if (newTaskButton) {
  newTaskButton.addEventListener('click', () => { window.location.href = 'crear-tarea.html'; });
  document.querySelector('#task-search').addEventListener('input', (event) => {
    const query = event.target.value.trim().toLocaleLowerCase('es');
    newTaskButton.hidden = Boolean(query) && !newTaskButton.textContent.toLocaleLowerCase('es').includes(query);
  });

  document.querySelectorAll('.filters button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });

  const loadTasks = () => {
    try { return JSON.parse(localStorage.getItem('flowcus-tasks') || '[]'); }
    catch { return []; }
  };
  const tasks = loadTasks();
  if (tasks.length) {
    const latest = tasks[tasks.length - 1];
    newTaskButton.innerHTML = `<i class="card-menu" aria-hidden="true">⋮</i><strong>${escapeHTML(latest.title)}</strong><span>${escapeHTML(latest.category)} · ${escapeHTML(latest.priority)}</span>`;
    newTaskButton.classList.add('has-task');
    document.querySelector('#planned-count').textContent = `${tasks.length} TAREA${tasks.length === 1 ? '' : 'S'} PLANIFICADA${tasks.length === 1 ? '' : 'S'}`;
    document.querySelector('.cycle-stat').textContent = `◉  ${tasks.reduce((sum, task) => sum + Number(task.cycles), 0)} Ciclos estim.`;
    document.querySelectorAll('.filters small').forEach((count, index) => { count.textContent = index < 2 ? `(${tasks.length})` : '(0)'; });
  }
}

const taskForm = document.querySelector('#task-form');
if (taskForm) {
  const titleInput = document.querySelector('#task-title');
  titleInput.addEventListener('input', () => {
    const count = titleInput.value.length;
    document.querySelector('#char-count').textContent = count ? `${count} / 120 caracteres` : 'Máx. 120 caracteres';
  });

  document.querySelectorAll('input[name="cycles"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const cycles = Number(radio.value);
      document.querySelector('#cycle-summary').textContent = `${cycles === 6 ? 'X' : cycles} CICLOS = ${cycles * 25} MINUTOS DE FOCO`;
    });
  });

  document.querySelector('#add-subtask').addEventListener('click', () => {
    const row = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const text = document.createElement('span');
    text.contentEditable = 'true';
    text.textContent = 'Subtarea';
    row.append(checkbox, text);
    document.querySelector('.subtasks').append(row);
    text.focus();
  });

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!taskForm.reportValidity()) return;
    const task = {
      title: titleInput.value.trim(),
      category: document.querySelector('#category').value,
      priority: document.querySelector('input[name="priority"]:checked').value,
      cycles: document.querySelector('input[name="cycles"]:checked').value,
      description: document.querySelector('#task-description').value.trim(),
      subtasks: [...document.querySelectorAll('.subtasks > label')]
        .map((row) => ({ title: row.querySelector('span').textContent.trim(), completed: row.querySelector('input').checked }))
        .filter((subtask) => subtask.title && subtask.title !== 'Subtarea'),
    };
    if (!task.title) return;
    try {
      const tasks = JSON.parse(localStorage.getItem('flowcus-tasks') || '[]');
      tasks.push(task);
      localStorage.setItem('flowcus-tasks', JSON.stringify(tasks));
    } catch { /* La navegación sigue funcionando aunque el navegador limite el almacenamiento local. */ }
    window.location.href = 'tareas.html';
  });
}

document.querySelectorAll('#logout').forEach((button) => {
  button.addEventListener('click', () => { window.location.href = 'index.html'; });
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

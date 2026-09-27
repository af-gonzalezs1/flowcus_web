const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  const password = document.querySelector("#password");
  const toggle = document.querySelector(".toggle-password");
  const message = document.querySelector("#form-message");

  toggle.addEventListener("click", () => {
    const showing = password.type === "password";
    password.type = showing ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(showing));
    toggle.setAttribute(
      "aria-label",
      showing ? "Ocultar contraseña" : "Mostrar contraseña",
    );
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = "";
    if (!signupForm.reportValidity()) return;
    if (!/(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password.value)) {
      message.textContent =
        "La contraseña debe incluir al menos un número y un símbolo.";
      password.focus();
      return;
    }
    window.location.href = "pages/tareas.html";
  });

  signupForm.addEventListener("input", () => {
    message.textContent = "";
    message.style.color = "";
  });
}

document.querySelectorAll(".filters, .view-tabs").forEach((group) => {
  const buttons = group.querySelectorAll(":scope > button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

document.querySelectorAll(".task-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("input, .card-menu")) return;
    document
      .querySelectorAll(".task-card")
      .forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");
  });
});

const taskSearch = document.querySelector("#task-search");
if (taskSearch) {
  taskSearch.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLocaleLowerCase("es");
    document.querySelectorAll(".task-card").forEach((card) => {
      const title = card
        .querySelector("strong")
        .textContent.toLocaleLowerCase("es");
      card.hidden = Boolean(query) && !title.includes(query);
    });
  });
}

const taskForm = document.querySelector("#task-form");
if (taskForm) {
  const titleInput = document.querySelector("#task-title");
  titleInput.addEventListener("input", () => {
    const count = titleInput.value.length;
    document.querySelector("#char-count").textContent = count
      ? `${count} / 120 caracteres`
      : "Máx. 120 caracteres";
  });

  document.querySelectorAll('input[name="cycles"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const cycles = Number(radio.value);
      document.querySelector("#cycle-summary").textContent =
        `${cycles === 6 ? "X" : cycles} CICLOS = ${cycles * 25} MINUTOS DE FOCO`;
    });
  });

  document.querySelector("#add-subtask").addEventListener("click", () => {
    const row = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const text = document.createElement("span");
    text.contentEditable = "true";
    text.textContent = "Subtarea";
    row.append(checkbox, text);
    document.querySelector(".subtasks").append(row);
    text.focus();
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!taskForm.reportValidity()) return;
    const task = {
      title: titleInput.value.trim(),
      category: document.querySelector("#category").value,
      priority: document.querySelector('input[name="priority"]:checked').value,
      cycles: document.querySelector('input[name="cycles"]:checked').value,
      description: document.querySelector("#task-description").value.trim(),
      subtasks: [...document.querySelectorAll(".subtasks > label")]
        .map((row) => ({
          title: row.querySelector("span").textContent.trim(),
          completed: row.querySelector("input").checked,
        }))
        .filter((subtask) => subtask.title && subtask.title !== "Subtarea"),
    };
    if (!task.title) return;
    try {
      const tasks = JSON.parse(localStorage.getItem("flowcus-tasks") || "[]");
      tasks.push(task);
      localStorage.setItem("flowcus-tasks", JSON.stringify(tasks));
    } catch {}
    window.location.href = "tareas.html";
  });
}

document.querySelectorAll("#logout").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});

function escapeHTML(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

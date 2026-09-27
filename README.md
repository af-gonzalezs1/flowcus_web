# Flowcus — Frontend Web

Maquetación en HTML, CSS y JS del frontend web de Flowcus, la aplicación de
gestión de tareas y sesiones de enfoque (técnica Pomodoro). Las interfaces son
navegables entre sí; los componentes con algún nivel de interacción (pestañas,
filtros, checkboxes, campos de formulario) responden visualmente al usuario,
pero no ejecutan lógica de negocio real ni se conectan a un backend.

## Estructura del repositorio

```
index.html                     → Pantalla de entrada (Crear cuenta)
pages/
  tareas.html                  → Gestión de tareas
  crear-tarea.html             → Crear tarea
  dashboard.html                → Dashboard
  planificacion.html            → Planificación de sesiones
  detalle-sesion.html           → Detalle de sesión
assets/
  css/styles.css                → Estilos compartidos por todas las pantallas
  js/script.js                  → Interacciones de UI (sin lógica de negocio)
```

## Pantallas maquetadas

1. **Crear cuenta** (`index.html`)
   Formulario de registro: nombre, correo, contraseña con toggle de
   visibilidad, aceptación de términos y validación básica de campos.

2. **Gestión de tareas** (`pages/tareas.html`)
   Listado de tareas con filtros (Todas / En curso / Completadas / Prioridad
   alta), buscador y acceso a la creación de una nueva tarea.

3. **Crear tarea** (`pages/crear-tarea.html`)
   Formulario para vincular una tarea a una sesión activa: título, categoría,
   nivel de prioridad, estimación en ciclos Pomodoro y checklist de subtareas.

4. **Dashboard** (`pages/dashboard.html`)
   Resumen del día: tiempo enfocado, ciclos Pomodoro completados, tareas
   pendientes, sugerencia de próxima sesión y lista de tareas prioritarias.

5. **Planificación de sesiones** (`pages/planificacion.html`)
   Agenda de sesiones programadas para el día, con estado de cada una (en
   preparación / pendiente), resumen de carga diaria y distribución por
   categoría.

6. **Detalle de sesión** (`pages/detalle-sesion.html`)
   Vista de control de una sesión: estructura de intervalos de foco/pausa,
   tarea vinculada con su checklist de progreso, panel de acciones y zona de
   cancelación.

## Cómo verlo localmente

No requiere build ni dependencias. Basta con abrir `index.html` en el
navegador, o servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

y visitar `http://localhost:8000/index.html`.

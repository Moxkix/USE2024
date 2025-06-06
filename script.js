// 1) Función para buscar el aula de examen según el código
async function findClassroom() {
  const courseCode = document.getElementById('courseCode').value
    .trim()
    .toUpperCase();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = ''; // borramos mensaje previo

  if (!courseCode) {
    resultDiv.textContent =
      'Mesedez, sartu irakasgai baten kodea / Por favor, introduce un código de asignatura';
    return;
  }

  try {
    const response = await fetch('asignaturas_aulas.json');
    const data = await response.json();
    const entry = data[courseCode];

    if (entry) {
      resultDiv.innerHTML = `
        <div style="font-weight: bold; text-transform: uppercase;">
          Irakasgaia / Asignatura: ${entry.asignatura_es} / ${entry.asignatura_eu}
        </div>
        <div style="margin-top: 6px; font-weight: bold; text-transform: uppercase;">
          Gela / Aula: ${entry.aula_es} / ${entry.aula_eu}
        </div>
      `;
    } else {
      resultDiv.textContent =
        'Irakasgaiaren kodea ez da aurkitu / Código de asignatura no encontrado';
    }
  } catch (error) {
    resultDiv.textContent = 'Errorea datuak kontsultatzerakoan / Error al consultar los datos';
  }
}

// 2) Función para mostrar el contador solo si admin=1 y llamar a Counter API
async function updateCounter() {
  const counterDiv = document.getElementById('counter');
  if (!counterDiv) return;

  // Si no somos "administrador" (no existe ?admin=1 en la URL), ocultamos y salimos
  if (!isAdmin()) {
    counterDiv.style.display = 'none';
    return;
  }

  // Si llegamos aquí, admin=1 → mostramos el div
  counterDiv.style.display = 'block';

  try {
    // Hacemos la llamada a Counter API v1 para incrementar el contador "visitas"
    const response = await fetch(
      'https://api.counterapi.dev/v1/use2025.github.io/visitas/up'
    );
    const data = await response.json();

    // DEBUG: ver en la consola cómo viene "data"
    console.log('Respuesta de Counter API →', data);
    // Ejemplo de “data” esperado:
    // {
    //   ID: 1,
    //   Name: "visitas",
    //   Count: 57,
    //   CreatedAt: "2025-05-20T10:15:00Z",
    //   UpdatedAt: "2025-06-05T14:20:23Z"
    // }

    // Extraemos la propiedad "Count" para mostrarla
    counterDiv.textContent = `Visitas: ${data.Count}`;
  } catch (error) {
    console.error('Error al actualizar el contador', error);
    counterDiv.textContent = 'No se pudo actualizar el contador';
  }
}

// Lee window.location.search y comprueba admin=1
function isAdmin() {
  return new URLSearchParams(window.location.search).get('admin') === '1';
}

// Esperamos a que el DOM cargue para invocar updateCounter
document.addEventListener('DOMContentLoaded', () => {
  updateCounter();
});

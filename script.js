async function findClassroom() {
    const courseCode = document.getElementById('courseCode').value.trim().toUpperCase();
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = ""; // Limpia el resultado anterior

    
    if (!courseCode) {
        resultDiv.textContent = "Mesedez, sartu irakasgai baten kodea / Por favor, introduce un código de asignatura";
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
            resultDiv.textContent = "Irakasgaiaren kodea ez da aurkitu / Código de asignatura no encontrado";
        }
    } catch (error) {
        resultDiv.textContent = "Errorea datuak kontsultatzerakoan / Error al consultar los datos";
    }
}

async function updateCounter() {
  const counterDiv = document.getElementById('counter');
  if (!counterDiv) return;
  if (!isAdmin()) {
    counterDiv.style.display = 'none';
    return;
  }
  counterDiv.style.display = 'block';

  try {
    // Llamada directa al endpoint de Counter API
    const response = await fetch('https://api.counterapi.dev/hit/use2025.github.io/visitas');
    const data = await response.json();
    counterDiv.textContent = `Visitas: ${data.value}`;
  } catch (error) {
    console.error('Error al actualizar el contador', error);
    counterDiv.textContent = 'No se pudo actualizar el contador';
  }
}



function isAdmin() {
    return new URLSearchParams(window.location.search).get('admin') === '1';
}

updateCounter();

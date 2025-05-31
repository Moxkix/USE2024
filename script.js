function toggleFields() {
    const isEuskera = document.getElementById('euskeraTest').checked;
    document.getElementById('standardFields').style.display = isEuskera ? 'none' : 'block';
    document.getElementById('euskeraFields').style.display = isEuskera ? 'block' : 'none';
}

async function findClassroom() {
    const isEuskera = document.getElementById('euskeraTest').checked;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = ""; // Limpia el resultado anterior

    try {
        const response = await fetch('asignaturas_aulas.json');
        const data = await response.json();

        if (isEuskera) {
            const lastName = document.getElementById('lastName').value.trim().toUpperCase();
            if (!lastName) {
                resultDiv.textContent = "Introduce los apellidos / Sartu abizenak.";
                return;
            }
            if (data.EUSKERA && data.EUSKERA[lastName]) {
                resultDiv.textContent = `Aula: ${data.EUSKERA[lastName].aula}`;
            } else {
                resultDiv.textContent = "Apellido no encontrado / Abizena ez da aurkitu.";
            }
        } else {
            const courseCode = document.getElementById('courseCode').value.trim().toUpperCase();
            if (!courseCode) {
                resultDiv.textContent = "Por favor, introduce un código de asignatura / Mesedez, sartu irakasgaiaren kode bat.";
                return;
            }
            const entry = data[courseCode];
            if (entry) {
                resultDiv.textContent = `Asignatura: ${entry.asignatura_es} / ${entry.asignatura_eu}, Aula: ${entry.aula_es} / ${entry.aula_eu}`;
            } else {
                resultDiv.textContent = "Código de asignatura no encontrado / Irakasgaiaren kodea ez da aurkitu.";
            }
        }
    } catch (error) {
        resultDiv.textContent = "Error al consultar los datos / Datuak kontsultatzerakoan errorea.";
    }
}

// Inicializa el estado de los campos al cargar la página
window.onload = toggleFields;

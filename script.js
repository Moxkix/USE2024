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
            resultDiv.textContent = `Asignatura: ${entry.asignatura_es} / ${entry.asignatura_eu}, Aula: ${entry.aula_es} / ${entry.aula_eu}`;
        } else {
            resultDiv.textContent = "Irakasgaiaren kodea ez da aurkitu / Código de asignatura no encontrado";
        }
    } catch (error) {
        resultDiv.textContent = "Errorea datuak kontsultatzerakoan  / Error al consultar los datos";
    }
}

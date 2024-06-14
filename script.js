async function findClassroom() {
    const courseCode = document.getElementById('courseCode').value.trim();
    const resultDiv = document.getElementById('result');

    if (courseCode === "") {
        resultDiv.textContent = "Por favor, introduce un código de asignatura.";
        return;
    }

    try {
        const response = await fetch('asignaturas_aulas.json');
        const data = await response.json();
        const entry = data[courseCode.toUpperCase()];

        if (entry) {
            resultDiv.textContent = `Asignatura: ${entry.asignatura}, Aula: ${entry.aula}`;
        } else {
            resultDiv.textContent = "Código de asignatura no encontrado.";
        }
    } catch (error) {
        resultDiv.textContent = "Error al consultar los datos.";
    }
}

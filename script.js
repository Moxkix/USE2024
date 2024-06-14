const translations = {
    es: {
        title: "Consulta de Aula de Examen",
        labelCourseCode: "Introduce el código de la asignatura:",
        btnSubmit: "Consultar Aula",
        resultNotFound: "Código de asignatura no encontrado.",
        resultError: "Error al consultar los datos.",
        resultPrompt: "Por favor, introduce un código de asignatura."
    },
    eu: {
        title: "Azterketa Gelaren Kontsulta",
        labelCourseCode: "Sartu irakasgaiaren kodea:",
        btnSubmit: "Kontsultatu Gela",
        resultNotFound: "Irakasgaiaren kodea ez da aurkitu.",
        resultError: "Datuak kontsultatzerakoan errorea.",
        resultPrompt: "Mesedez, sartu irakasgaiaren kode bat."
    }
};

function setLanguage(language) {
    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('labelCourseCode').textContent = translations[language].labelCourseCode;
    document.getElementById('btnSubmit').textContent = translations[language].btnSubmit;
}

async function findClassroom() {
    const courseCode = document.getElementById('courseCode').value.trim();
    const resultDiv = document.getElementById('result');
    const language = document.querySelector('input[name="language"]:checked').value;

    if (courseCode === "") {
        resultDiv.textContent = translations[language].resultPrompt;
        return;
    }

    try {
        const response = await fetch('asignaturas_aulas.json');
        const data = await response.json();
        const entry = data[courseCode.toUpperCase()];

        if (entry) {
            resultDiv.textContent = `Asignatura: ${entry.asignatura}, Aula: ${entry.aula}`;
        } else {
            resultDiv.textContent = translations[language].resultNotFound;
        }
    } catch (error) {
        resultDiv.textContent = translations[language].resultError;
    }
}

// Set default language to Spanish
setLanguage('es');

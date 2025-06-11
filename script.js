document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const acumulados = parseInt(document.getElementById("acumulados").value);
  const objetivo = parseInt(document.getElementById("objetivo").value);
  const resultadoDiv = document.getElementById("resultado");

  if (isNaN(acumulados) || isNaN(objetivo) || acumulados < 0 || objetivo <= 0) {
    resultadoDiv.innerHTML = "<p>Por favor, ingresa valores válidos.</p>";
    return;
  }

  if (acumulados >= objetivo) {
    resultadoDiv.innerHTML = `<p>¡Ya has alcanzado o superado los ${objetivo} días de práctica!</p>`;
    return;
  }

  const hoy = new Date();
  let diasHabiles = acumulados;
  let fechaActual = new Date(hoy);

  while (diasHabiles < objetivo) {
    fechaActual.setDate(fechaActual.getDate() + 1);
    const dia = fechaActual.getDay();
    if (dia >= 1 && dia <= 5) { // lunes a viernes
      diasHabiles++;
    }
  }

  const opcionesFecha = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
  const fechaFinalStr = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
  const hoyStr = hoy.toLocaleDateString('es-ES', opcionesFecha);
  const diasNaturales = Math.round((fechaActual - hoy) / (1000 * 60 * 60 * 24));
  const diasRestantes = objetivo - acumulados;

  resultadoDiv.innerHTML = `
    <p><strong>Hoy es:</strong> ${hoyStr}</p>
    <p><strong>Días de práctica acumulados:</strong> ${acumulados}</p>
    <p><strong>Faltan:</strong> ${diasRestantes} días de práctica para alcanzar los ${objetivo} días.</p>
    <p><strong>Llegarás a ${objetivo} días de práctica el:</strong> ${fechaFinalStr}</p>
    <p><strong>Faltan:</strong> ${diasNaturales} días naturales desde hoy.</p>
  `;
});

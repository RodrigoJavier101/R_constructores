// ...dentro del <script> en contact.html...

document.getElementById("generatePdfButton").addEventListener("click", async function (e) {
  e.preventDefault();

  // 1. Obtener datos del formulario
  const name = document.getElementById("name").value.trim();
  const rut = document.getElementById("rut").value.trim();
  const address = document.getElementById("address").value.trim();
  const civilStatus = document.getElementById("civilStatus").value.trim();
  const nationality = document.getElementById("nationality").value.trim();
  const functions = document.getElementById("functions").value.trim();
  const afp = document.getElementById("afp").value;
  const health = document.getElementById("health").value;
  const date = document.getElementById("date").value;
  const endDate = document.getElementById("endDate").value;
  const servicePlace = document.getElementById("servicePlace").value;

  // 2. Cargar el template
  let templateText = "";
  try {
    const response = await fetch("docs/CTTO.txt");
    templateText = await response.text();
  } catch (err) {
    alert("No se pudo cargar el template.");
    return;
  }

  // 3. Reemplazar los placeholders entre xx
  templateText = templateText
    .replace(/xxnombrexx/g, name)
    .replace(/xxrutxx/g, rut)
    .replace(/xxdomicilioxx/g, address)
    .replace(/xxestado_civilxx/g, civilStatus)
    .replace(/xxnacionalidadxx/g, nationality)
    .replace(/xxfuncionesxx/g, functions)
    .replace(/xxafpxx/g, afp)
    .replace(/xxsaludxx/g, health)
    .replace(/xxfecha_inicioxx/g, new Date(date).toLocaleDateString("es-ES"))
    .replace(/xxfecha_terminoxx/g, new Date(endDate).toLocaleDateString("es-ES"))
    .replace(/xxlugar_servicioxx/g, servicePlace);

  // 4. Generar el PDF
  const doc = new window.jspdf.jsPDF();
  const lines = doc.splitTextToSize(templateText, 180);
  doc.setFontSize(11);
  let y = 20;
  lines.forEach(line => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 15, y);
    y += 8;
  });

  doc.save(`contrato_${name.split(" ")[0]}.pdf`);
});
const JSReport = require("jsreport-core")();

const fs = require("fs");
const path = require('path');

let jsreportStarted = false;
const initReport = () => {
    if (jsreportStarted) {
        return Promise.resolve(JSReport);
    }
    jsreportStarted = true;
    return JSReport.init();
};
const crearPlantilla = (nombrePlantilla) => {
  const filePath = path.join(process.cwd(), 'templates', `reportePruebas.html`)
  let html = fs.readFileSync(filePath).toString();

  let plantilla = {};
  plantilla.content = html;
  plantilla.recipe = "chrome-pdf";
  plantilla.engine = "handlebars";
  return plantilla;
};

const crearPDF = async (data, nombrePlantilla) => {
  // Inicializar el JSReport
  await initReport();

  let infoPdf = {};
  infoPdf.template = crearPlantilla(nombrePlantilla);
  infoPdf.data = data;

  let resultado = await JSReport.render(infoPdf);
  return resultado.content;
};

module.exports = { crearPDF };
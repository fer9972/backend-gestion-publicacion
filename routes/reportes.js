const express = require("express");
const router = express.Router();

const { PassThrough } = require("stream");
const { crearPDF } = require("../services/pdf/jsreport");
const _controlador = require("../controllers/reportes");

router.get("/info-publicacion/obtener/:id", (req, res) => {
  
  let id = req.params.id;
  console.log(id);
  _controlador
    .consultarPublicacionJJ(id)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje = registros.length > 0 ? "Publicacion consultada." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
      
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/pdf/:id/", async (req, res) => {
  try {
    let info ={};
    let id = req.params.id;
    let titulo = req.params.titulo;

    _controlador
    .consultarPublicacionJJ(id)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      info = registros;
      let mensaje = registros.length > 0 ? "Publicacion consultada." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
      
    })
    .catch((error) => {
      res.send(error);
    });

    console.log("publicacion: "+info);
    //let autor = req.params.autor;
    res.set("Content-disposition", "attachment; filename=reporte.pdf");
    
    let bufferPDF = await crearPDF(info, "reportePruebas");

    let stream = new PassThrough();
    stream.end(bufferPDF);
    stream.pipe(res);
    //return res.send("OK");
  } catch (error) {
    return res.status(500).send(error);
  }
});
//node c:\Users\Kevin\Music\new\proyect\backend\app.js




module.exports = router;
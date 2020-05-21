const express = require("express");
const router = express.Router();

const { PassThrough } = require("stream");
const { crearPDF } = require("../services/pdf/jsreport");




router.get("/pdf", async (req, res) => {
  try {
    res.set("Content-disposition", "attachment; filename=reporte.pdf");
    /*let info = {
        nombre: "Santiago",
        people: ["Yehuda Katz", "Alan Johnson", "Charles Jolley", "fer"],
      };*/
      console.log(req)
      let info1 = req.body;
       console.log("hola" + info1)
    
    let bufferPDF = await crearPDF(info1, "reportePruebas");

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
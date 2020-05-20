const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/registro-autor");

/**
 * Obteniendo los autores
 */
router.get("/registro-autor", (req, res) => {
  _controlador.consultarAutor().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "autores consultados" });
    }).catch(error => {
      res.send(error);
    });
});

/**
 * Obteniendo rol de autor
 */
router.get("/registro-autor/rol/:id", (req, res) => {

  let id = req.params.id;
  _controlador.consultarRolAutor(id).then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "Rol de usuario consultado" });
    }).catch(error => {
      res.send(error);
    });
});

/**
 * Guardando una autor
 */
router.post("/registro-autor", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let autor = req.body;

    // Valida la información, sino se envia al catch
    //_controlador.validarPublicacion(autor);

    // Guardar el autor en base de datos
    _controlador.guardarAutor(autor).then(respuestaDB => {
      res.send({ok: true, mensaje: "autor guardado", info: autor});
      console.log("Hola")
    }).catch(error => {
      res.send(error.response);
    });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
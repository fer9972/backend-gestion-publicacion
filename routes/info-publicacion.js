const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/info-publicacion");

/**
 * Obteniendo las publicaciones
 */
router.get("/info-publicacion", (req, res) => {
  _controlador.consultarPublicaciones().then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({ ok: true, info: registros, mensaje: "publicaciones consultadas" });
    }).catch(error => {
      res.send(error);
    });
});

/**
 * Obtener una publicacion por id
 */
router.get("/info-publicacion/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  _controlador
    .consultarPublicacion(id)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje = registros.length > 0 ? "Publicacion consultada." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Obtener una publicacion por id
 */
router.get("/info-publicacion/obtener/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  _controlador
    .consultarPublicacionJ(id)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje = registros.length > 0 ? "Publicacion consultada." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guardando una publicacion
 */
router.post("/info-publicacion", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_publicacion = req.body;

    // Valida la información, sino se envia al catch
    //_controlador.validarPublicacion(info_publicacion);

    // Guardar la publicacion en base de datos
    _controlador.guardarPublicacion(info_publicacion).then(respuestaDB => {
      res.send({ ok: true, mensaje: "Publicacion guardada", info: info_publicacion });
    }).catch(error => {
      res.send(error);
    });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

/**
 * Eliminar una publicacion
 */
router.delete("/info-publicacion/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  _controlador
    .eliminarPublicacion(id)
    .then((respuestaDB) => {
      res.send({ ok: true, info: {}, mensaje: "Publicacion eliminada correctamente" });
    })
    .catch((error) => {
      res.send(" se daño"+ error);
    });
});

/**
 * Modificar una publicacion
 */
router.put("/info-publicacion/:id", (req, res) => {
  // Capturar el parámetro de la ruta
  let id = req.params.id;

  let info_pub = req.body;
  console.log(info_pub);
  _controlador
    .modificarPublicacion(info_pub, id)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "la publicacion ha sido modificada", info: respuestaDB });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
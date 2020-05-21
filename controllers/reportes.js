const servicioPg = require("../services/postgres");

let consultarPublicacionJJ = async (id) => {
    try {
        console.log(id);
      let _servicio = new servicioPg();
      let sql = `select * from public.pu_propuestas_publicaciones
      where id = '${id}';`;
      let respuesta = await _servicio.ejecutarSql(sql);
      //let resultado = respuesta.rows;
      return respuesta;
    } catch (error) {
      throw { ok: false };
    }
  };

  module.exports = {consultarPublicacionJJ}
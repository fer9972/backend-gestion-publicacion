/**
 * Controlador de info-publicacion
 */

//importar el servicion de postgres
const servicioPg = require('../services/postgres')

/**
 * Validando la informacion del autor
 * @param {*} autor pagina en forma de JSON
 */
let validarAutor = (autor) => {
    if (!autor) {
        throw {
            ok: false, mensaje: "La info del autor es obligatoria"
        }
    }

    if (!autor.nombre) {
        throw {
            ok: false, mensaje: "El nombre es obligatorio"
        }
    }

    if (!autor.apellidos) {
        throw {
            ok: false, mensaje: "los apellidos son obligatorios"
        }
    }

    if (!autor.edad) {
        throw {
            ok: false, mensaje: "La edad es obligatoria"
        }
    }


    if (!autor.correo) {
        throw {
            ok: false, mensaje: "el correo es obligatoria"
        }
    }

 
    if (!autor.ocupacion) {
        throw {
            ok: false, mensaje: "la ocupacion es obligatoria"
        }
    }

    if (!autor.clave) {
        throw {
            ok: false, mensaje: "La clave es obligatoria"
        }
    }
}

//TERMINAR el query

/**
 * Guardando el autor en la base de datos
 * @param {*} autor datos del autor en en forma de JSON
 */
let guardarAutor = async (autor)=> {
    try {
        let _servicio = new servicioPg()
        let sql = `INSERT INTO public.acc_usuarios(
             id, nombre, apellidos, edad, correo, ciudad, ocupacion, clave, rol)
        VALUES (
            '${autor.id}',
            '${autor.nombre}',
            '${autor.apellidos}',
            '${autor.edad}',
            '${autor.correo}',
            '${autor.ciudad}',
            '${autor.ocupacion}',
            md5('${autor.clave}'),
            '${autor.rol}'
            );`;
            console.log(this.sql)
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

//Consultando rol de autor
let consultarRolAutor = async (id) => {
    try {
        let _servicio = new servicioPg()
        let sql = `SELECT rol from public.acc_usuarios WHERE id = '${id}'`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

//exportando metodos en forma de JSON
module.exports = {validarAutor, guardarAutor, consultarRolAutor};
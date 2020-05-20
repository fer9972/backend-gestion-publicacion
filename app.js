//añadiendo express
const express = require("express");
const cors = require("cors");
//node const morgan = requiere("morgan")


//inicializar la libreria
const app = express();
app.use(express.json());
app.use(cors());
//app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("Api de proyecto editorial UdeM modulo 1");
  });
  
//ruta con su propio endpoint
const rutas_info_publicacion = require('./routes/info-publicacion')
app.use(rutas_info_publicacion);

const rutas_seguimientos = require('./routes/seguimiento-publicacion')
app.use(rutas_seguimientos);

const rutas_autenticacion = require("./routes/autentificacion");
app.use(rutas_autenticacion);

const rutas_registro = require('./routes/registro-autor')
app.use(rutas_registro);

  // Puerto
  const port = 3001;
  // Levantar el servidor para escuchar los puertos
  app.listen(port, () => {
    console.log(`Escuchando API en http://localhost:${port}`);
  });
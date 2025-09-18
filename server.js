const express = require("express");
const {sequelize} = require('./models');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const cuentasController = require("./controllers/cuentasController.js");
const productosController = require("./controllers/productosController.js");
const ventasController = require("./controllers/ventasController.js");
const empleadosController = require("./controllers/empleadosController.js");
const rolesController = require("./controllers/rolesController.js");

require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}));

// Rutas cuentas
app.post('/signup', cuentasController.signup)
app.post('/login', cuentasController.login)
app.post('/logout', cuentasController.logout)
app.get('/accounts', cuentasController.fetchAccounts)
app.get('/cuentas/:cantidad/:pagina/:busqueda?', cuentasController.fetchAccountsPag)
app.put('/update_account/:id', cuentasController.modAccount)
app.delete('/delete_account/:id', cuentasController.deleteAccount)
app.get('/check-auth', cuentasController.checkAuth)

// Rutas de productos
app.get("/productos/:cantidad/:pagina/:busqueda?", productosController.fetchProductosPag);
app.get("/productos/:id", productosController.fetchProducto);
app.post("/productos", productosController.createProducto);
app.put("/productos/:id", productosController.updateProducto);
app.delete("/productos/:id", productosController.deleteProducto);

// Rutas de ventas
app.get("/ventas", ventasController.fetchVentas);
app.get("/ventas/:cantidad/:pagina/:busqueda?", ventasController.fetchVentasPag);
app.get("/ventas/:id", ventasController.fetchVenta);
app.get("/ventas/detalle_ventas/:id", ventasController.fetchDetalleVenta);
app.post("/ventas", ventasController.createVenta);
app.delete("/ventas/:id", ventasController.deleteVenta);

// Rutas de empleados
app.get("/empleados/:cantidad/:pagina/:busqueda?", empleadosController.fetchEmpleadosPag);
app.get("/empleados/:id", empleadosController.fetchEmpleado);
app.post("/empleados", empleadosController.createEmpleado);
app.put("/empleados/:id", empleadosController.updateEmpleado);
app.delete("/empleados/:id", empleadosController.deleteEmpleado);

// Rutas de roles
app.get("/roles/:cantidad/:pagina/:busqueda?", rolesController.fetchRolesPag);
app.get("/roles/:id", rolesController.fetchRol);
app.post("/roles", rolesController.createRol);
app.put("/roles/:id", rolesController.updateRol);
app.delete("/roles/:id", rolesController.deleteRol);


(async () => {
  try {
    // Probar conexión
    await sequelize.authenticate();
    console.log("Conexión exitosa a PostgreSQL");

    // Levantar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error conectando a la DB:", err);
  }
})();


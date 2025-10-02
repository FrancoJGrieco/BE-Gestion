const express = require("express");
const { sequelize } = require('./models');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const cuentasController = require("./controllers/cuentasController.js");
const productosController = require("./controllers/productosController.js");
const ventasController = require("./controllers/ventasController.js");
const empleadosController = require("./controllers/empleadosController.js");
const rolesController = require("./controllers/rolesController.js");
const requireAuth = require("./middleware/requireAuth.js");
const checkRol = require("./middleware/checkRol.js");

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
app.post('/signup', requireAuth, cuentasController.signup)
app.post('/login', cuentasController.login)
app.post('/logout', requireAuth, cuentasController.logout)
app.get('/accounts', requireAuth, checkRol('cuentas'), cuentasController.fetchAccounts)// en vez de ponerle un rol le tengo 
app.get('/cuentas/:cantidad/:pagina/:busqueda?', requireAuth, checkRol('cuentas'), cuentasController.fetchAccountsPag)
app.get('/cuentas/:id', cuentasController.fetchAccount)
app.get('/cuentas/usuario/:usuario', cuentasController.fetchAccountName)
app.put('/update_account/:id', requireAuth, checkRol('cuentas'), cuentasController.modAccount)
app.delete('/delete_account/:id', requireAuth, checkRol('cuentas'), cuentasController.deleteAccount)
app.get('/check-auth', cuentasController.checkAuth)

// Rutas de productos
app.get("/productos/:cantidad/:pagina/:busqueda?", requireAuth, checkRol('productos'), productosController.fetchProductosPag);
app.get("/productos/:id", requireAuth, checkRol('productos'), productosController.fetchProducto);
app.post("/productos", requireAuth, checkRol('productos'), productosController.createProducto);
app.put("/productos/:id", requireAuth, checkRol('productos'), productosController.updateProducto);
app.delete("/productos/:id", requireAuth, checkRol('productos'), productosController.deleteProducto);

// Rutas de ventas
app.get("/ventas", requireAuth, checkRol('ventas'), ventasController.fetchVentas);
app.get("/ventas/empleado/:id", requireAuth, checkRol('ventas'), ventasController.fetchVentasEmpleado);
app.get("/ventas/fecha/:start/:end", requireAuth, checkRol('ventas'), ventasController.fetchVentasEmpleadoFecha);
app.get("/ventas/:cantidad/:pagina/:busqueda?", requireAuth, checkRol('ventas'), ventasController.fetchVentasPag);
app.get("/ventas/:id", requireAuth, checkRol('ventas'), ventasController.fetchVenta);
app.get("/ventas/detalle_ventas/:id", requireAuth, checkRol('ventas'), ventasController.fetchDetalleVenta);
app.post("/ventas", requireAuth, checkRol('ventas'), ventasController.createVenta);
app.delete("/ventas/:id", requireAuth, checkRol('ventas'), ventasController.deleteVenta);

// Rutas de empleados
app.get("/empleados", requireAuth, checkRol('empleados'), empleadosController.fetchEmpleados);
app.get("/empleados/:cantidad/:pagina/:busqueda?", requireAuth, checkRol('empleados'), empleadosController.fetchEmpleadosPag);
app.get("/empleados/:id", requireAuth, checkRol('empleados'), empleadosController.fetchEmpleado);
app.post("/empleados", requireAuth, checkRol('empleados'), empleadosController.createEmpleado);
app.put("/empleados/:id", requireAuth, checkRol('empleados'), empleadosController.updateEmpleado);
app.delete("/empleados/:id", requireAuth, checkRol('empleados'), empleadosController.deleteEmpleado);

// Rutas de roles
app.get("/roles/:cantidad/:pagina/:busqueda?", requireAuth, checkRol('roles'), rolesController.fetchRolesPag);
app.get("/roles/:id", requireAuth, checkRol('roles'), rolesController.fetchRol);
app.post("/roles", requireAuth, checkRol('roles'), rolesController.createRol);
app.put("/roles/:id", requireAuth, checkRol('roles'), rolesController.updateRol);
app.delete("/roles/:id", requireAuth, checkRol('roles'), rolesController.deleteRol);


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


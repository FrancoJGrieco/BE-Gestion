const express = require("express");
const sequelize = require('./db');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const productosController = require("./controllers/productosController.js");
const cuentasController = require("./controllers/cuentasController.js");

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
app.put('/update_account/:id', cuentasController.modAccount)
app.delete('/delete_account/:id', cuentasController.deleteAccount)
app.get('/check-auth', cuentasController.checkAuth)

// Rutas de productos
app.get("/productos", productosController.fetchProductosName);
app.get("/productos/:id", productosController.fetchProducto);
app.post("/productos", productosController.createProducto);
app.put("/productos/:id", productosController.updateProducto);
app.delete("/productos/:id", productosController.deleteProducto);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a PostgreSQL');
    
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Error conectando a la DB:', err);
  }
})();
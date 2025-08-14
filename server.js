const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { client } = require("./config/connectToDb.js");
const productosController = require("./controllers/productosController.js");

require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.get('/', () => { console.log('holamundo') })
app.get("/productos", productosController.fetchProductosName);
app.get("/productos/:id", productosController.fetchProducto);
app.post("/productos", productosController.createProducto);
app.put("/productos/:id", productosController.updateProducto);
app.delete("/productos/:id", productosController.deleteProducto);

client.connect();
app.listen(process.env.PORT, () => {
	console.log(`server listening on port http://localhost:5433`);
});

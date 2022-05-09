const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require("./routes/indexrouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

const userMiddleware = require("../middlewares/userMiddleware");

const methodOverride =  require('method-override');
const expressSession = require("express-session");



app.set("view engine", "ejs"); //template engine
app.set("views", "./src/views");

app.use(express.json()); //para trabajar con formularios
app.use(express.urlencoded({ extended: false })); //permite recibir la información via post desde los formularios
app.use(express.static(path.join(__dirname,'../public')))
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use(expressSession({
    secret: "session secret",
    resave: true,
    saveUninitialized: false,
}));
app.use(userMiddleware);

app.use("/", indexRouter);
app.use("/productos", productRouter);
app.use("/usuarios", userRouter);

app.listen(3000,()=>console.log('ejecutando servidor en el puerto 3000'))




/*
/ --> a indexController.index
/carrito --> a indexController.carrito
/usuarios/login --> a userController.login
/usuarios/registro --> a userController.registro
/productos/id --> a productController.product
/productos/createProduct --> a productController.createProduct
/productos/updateProduct --> a productController.updateProduct
*/


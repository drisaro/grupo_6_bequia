const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const indexRouter = require("./routes/indexrouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
//Aquí pueden colocar las rutas de las APIs
const apiUserRouter = require("./routes/api/apiUserRouter");
const apiProductRouter = require("./routes/api/apiProductRouter");
const apiCategoryRouter = require("./routes/api/apiCategoryRouter");

const cookieParser = require('cookie-parser');

const userMiddleware = require("../middlewares/userMiddleware");
const cookie_recordarme = require("../middlewares/cookie_recordame");

const methodOverride =  require('method-override');
const expressSession = require("express-session");

app.use(cors());

app.set("view engine", "ejs"); //template engine
app.set("views", "./src/views");

app.use(express.json()); //para trabajar con formularios
app.use(express.urlencoded({ extended: false })); //permite recibir la información via post desde los formularios
app.use(express.static(path.join(__dirname,'../public')))
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(cookieParser());

app.use(expressSession({
    secret: "session secret",
    resave: true,
    saveUninitialized: false,
}));

app.use(cookie_recordarme);  //esta cookie/middleWare tiene que ir antes que el userMiddleware ya que leo primero la info guardada en req.session.user
app.use(userMiddleware);

app.use("/", indexRouter);
app.use("/productos", productRouter);
app.use("/usuarios", userRouter);
app.use(apiUserRouter)
app.use(apiProductRouter)
app.use(apiCategoryRouter)

app.listen(3030,()=>console.log('ejecutando servidor en el puerto 3030'))




/*
/ --> a indexController.index
/carrito --> a indexController.carrito
/usuarios/login --> a userController.login
/usuarios/registro --> a userController.registro
/productos/id --> a productController.product
/productos/createProduct --> a productController.createProduct
/productos/updateProduct --> a productController.updateProduct
*/


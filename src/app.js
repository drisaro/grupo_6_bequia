const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require("./routes/indexrouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const methodOverride =  require('method-override');



app.set("view engine", "ejs");
app.set("views", "./src/views");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'../public')))
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

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


// app.get('/',(req,res)=>{
  
//    res.render('index')
// })

// app.get('/login',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/login.html'))
// })

// app.get('/register',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/register.html'))
// })

// app.get('/carrito',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/productCart.html'))
// })

// app.get('/producto',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/productDetail.html'))
// })


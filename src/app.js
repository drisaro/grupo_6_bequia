const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require("./routes/indexrouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");


app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/", indexRouter);
app.use("/productos", productRouter);
app.use("/usuarios", userRouter);


app.use(express.static(path.join(__dirname,'../public')))

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

app.listen(3000,()=>console.log('ejecutando servidor en el puerto 3000'))
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: (req, res) => {
        let productList=products.filter(product=>product.show)
        res.render("products",{productList,toThousand})
    },
    createProduct: (req, res) => {
        res.render("createProduct")
    },
    updateProduct: (req, res) => {
        let idProduct=req.params.id;
        let product=products.find(product=>product.id==idProduct)
        res.render("updateProduct")
    },
    carrito: (req, res) => {
        res.render("carrito")
    },
    product: (req, res) => {
        let idProduct=req.params.id;
        let product=products.find(product=>product.id==idProduct)
        res.render("productDetail", {product,toThousand})
    },
    storeProduct: (req,res) => {
        console.log("Producto guardado") //Falta generar lógica para redirigir los datos (guardar y mostrar la vista) utilizar res.redirect 
    }
}

module.exports=controller
const controller = {
    createProduct: (req, res) => {
        res.render("createProduct")
    },
    updateProduct: (req, res) => {
        res.render("updateProduct")
    },
    carrito: (req, res) => {
        res.render("carrito")
    },
    product: (req, res) => {
        res.render("productDetail")
    },
    storeProduct: (req,res) => {
        console.log("Producto guardado") //Falta generar lógica para redirigir los datos (guardar y mostrar la vista) utilizar res.redirect 
    }
}

module.exports=controller
const controller = {
    index: (req, res) => {
    res.render("index")
    },
    carrito: (req, res) => {
        res.render("productCart")
    }
}

module.exports=controller
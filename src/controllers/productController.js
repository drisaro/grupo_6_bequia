const controller = {
    index: (req, res) => {
    res.render("index")
    },
    product: (req, res) => {
        res.render("productDetail")
    },
    createProduct: (req, res) => {
        res.render("createProduct")
    },
    updateProduct: (req, res) => {
        res.render("updateProduct")
    }
}

module.exports=controller
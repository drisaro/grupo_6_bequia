const controller = {
    index: (req, res) => {
    res.render("index")
    },
    product: (req, res) => {
        res.render("productDetail")
    }
}

module.exports=controller
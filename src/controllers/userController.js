const controller = {
    login: (req, res) => {
    res.render("login.ejs")
    },
    register: (req, res) => {
        res.render("register.ejs")
    }
}

module.exports=controller
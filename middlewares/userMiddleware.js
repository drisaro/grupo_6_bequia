module.exports = function (req, res, next){
    if (req.session?.user){
        res.locals.userData = req.session.user; //se le agrega a locals una variable que se llama userData que tiene lo que esta en req.session.user (que tiene el color y el name)
    }
    next();
}

//if(req.sesssion?.user){} es = if(req.session && req.session.user){}
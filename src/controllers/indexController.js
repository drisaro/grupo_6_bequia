const db = require('../database/models');  //permite interactuar con la BD
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Productos = db.Producto;


const controller = {
    index: (req, res) => {

        Productos.findAll({
			where: { mostrar: 1 },
            order : [
                ['id', 'DESC']
            ],
            limit: 4
        })
        .then(products=>{
            //return res.json(products)
			res.render("index",{productList:products})
        })

       // res.render("index")
    },

}

module.exports=controller
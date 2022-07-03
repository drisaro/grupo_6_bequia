const fs = require('fs');
const path = require('path');

const db = require('../src/database/models');  //permite interactuar con la BD
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Usuario = require('../src/database/models/Usuario');
const Usuarios = db.Usuario;


//const userFilePath = path.join(__dirname, '../src/data/usersDataBase.json');

//function readDB() {
	//return JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
//}

function cookie_recordarme(req, res, next) {


    if (req.cookies.cookie_recordarme != undefined && req.session.user == undefined) {

		Usuarios.findOne({
			where:{
				email_usuario:req.cookies.cookie_recordarme,
			}
		})
		.then(usuario=>{
			  
			if (usuario){

				console.log("ESTOVES UNA FUCKING PRUEBAAAAAAAAAAAAAAAAA");
	
				req.session.user = { //se guardan aca porque ahi sabemos que pasaron las validaciones
					email_usuario: usuario.email_usuario
				}
			}
	   
		}) 

      //  const users = readDB();
	 //	const usuario = users.find(user => user.email_usuario == req.cookies.cookie_recordarme);

		//console.log(usuario);

        
    };

    next();
}

module.exports = cookie_recordarme;
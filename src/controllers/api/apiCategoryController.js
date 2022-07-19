
const {validationResult}=require('express-validator');
const bcrypt = require("bcryptjs");

const db = require('../../database/models');  //permite interactuar con la BD
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const Usuario = require('../../database/models/Usuario');
const Categorias = db.Categoria;




const controller = {
    // Root - Show all users
    list: (req, res) => {
		Categorias.findAll(
			{
				include: ['productos']
			  }
		)
        .then(categoryList=>{

			 return res.status(200).json({
                    meta: {
                        status: res.statusCode,
                        total: categoryList.length,
                        url: "api/categorias",
                    },
                    data: categoryList,
                })
        })
       
    },
   // Detail - Detail from one user
   user: (req, res) => {

	Usuarios.findByPk(req.params.id)
	.then(user => {
			
		let respuesta = {
			meta: {
				status: res.statusCode,
				total: user.length,
				url: '/api/usuarios/:id'
			},
			data: user
		}
        return res.status(200).json(respuesta);

		
	});

	 },  
	// Delete - Delete one user from DB
	destroy : async (req, res) => {

		try {
            //await Usuarios.destroy(req.params.id)
			await Usuarios.update({
               mostrar:0
            },
            {
                where: { id: req.params.id }
            });
            return res.redirect("/usuarios")
        } catch(err)
        {console.error(err)}

		// const id = req.params.id;
        // let users = readDB();
		// users = users.map(user => {
		// 	if(user.id == id){
		// 		user.mostrar = false
		// 	}
		// 	return user;
		// });
		// fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))
		// return res.redirect("/usuarios");
	},
     // Update - Form to edit
    editUser: (req, res) => {
		
		Usuarios.findByPk(req.params.id)
		.then(user => {
			//user.password_usuario=dcodeIO.bcrypt.hashSync(user.password_usuario, 10);
			res.render('updateUser', {user});
		});
        // const users = readDB();
		// const user = users.find(user => user.id == id);
		// return res.render("updateUser", { user });
    },
	// Update - Form to save changes
	updateUser: async (req, res) => {

		try{

            await Usuarios.update({
                nombre_usuario: req.body.nombre_usuario,
                apellidos_usuario: req.body.apellidos_usuario,
                email_usuario: req.body.email_usuario,
                password_usuario: req.body.password_usuario,
                categoria_usuario: req.body.categoria_usuario,
				imagen_usuario: req.file?.filename ?? Usuarios.imagen_usuario

            },
            {
                where: { id: req.params.id }
            });
            return res.redirect("/usuarios");
        } catch(err) {
            console.error(err)
        }

		// const id = req.params.id;
		// let users = readDB();
		// users = users.map(user => {

		// 	if(user.id == id){
		// 		   user.nombre_usuario = req.body.nombre_usuario,
        //         user.apellidos_usuario = req.body.apellidos_usuario,
        //         user.email_usuario = req.body.email_usuario,
        //         user.password_usuario = req.body.password_usuario,
        //         user.categoria_usuario = req.body.categoria_usuario,

		// 		user.imagen_usuario = req.file?.filename ?? user.imagen_usuario
		// 	}

		// 	return user;
		// });
		// fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))
		// return res.redirect("/usuarios");
	},
    // Create - Form to create
    createUser: (req, res) => {
        res.render("createUser")
    },
	// Create - Form to save
    storeUser: async (req, res) => {
		const resultValidation=validationResult(req)
		
		if(resultValidation.errors.length>0){
			return res.render('createUser',{
				errors:resultValidation.mapped(), //mapped convierte el array en un objeto literal
				oldData:req.body,
			})
		}else{
			//const users = readDB();
			const password_encriptada = bcrypt.hashSync(req.body.password_usuario, 10)

			try {
				await Usuarios.create({
					...req.body,
					password_usuario: password_encriptada,
					imagen_usuario: req.file?.filename ?? "default-image.png",
					mostrar:1
				});
				return res.redirect("/usuarios")
			} catch(err) {
				console.error(err)
			}

			// const usuarioNuevo = {
			// 	id: users.length > 0 ? users[ users.length - 1 ].id + 1 : 1,
			// 	...req.body,
			// 	password_usuario: password_encriptada,
			// 	imagen_usuario: req.file?.filename ?? "default-image.png",
			// 	mostrar:true
			// }

			// users.push(usuarioNuevo);
			// fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))

			//return res.redirect("/usuarios")
		}
 
	},
	// Login - Form to login
    login: (req, res) => {
        res.render("login.ejs")
        },
	// Login - Form to process login
	processLogin: (req, res) => {

	const resultValidation=validationResult(req)

	if(resultValidation.errors.length>0){
		return res.render('login',{
			errors:resultValidation.mapped(),
			oldData:req.body,
		})
	}
	else {
		
		const email = req.body.email_usuario
		const password = req.body.password_usuario

		//const users = readDB();
		

		//	const usuario = users.find(user => user.email_usuario == email && (bcrypt.compareSync(password, user.password_usuario)));
		 Usuarios.findOne({
			 where:{
				 email_usuario:email,
				// password_usuario:bcrypt.hashSync(password, 10)
			 }
		 })
		 .then(usuario=>{
		   	

			if (usuario){

				//console.log(password,usuario.password_usuario)
				if(bcrypt.compareSync(password, usuario.password_usuario))
				{
					//return res.render('correcto')
					//return res.json(req.body)

					if (req.body.recordame != undefined) {
						res.cookie("cookie_recordarme", req.body.email_usuario, {maxAge: 90000});
					}
					req.session.user = { //se guardan aca porque ahi sabemos que pasaron las validaciones
						email_usuario: req.body.email_usuario
					}
					const user = {      //aca por ej guardamos TODO el usuario en una constante porque las validaciones estan OK
						...req.body
					}
					res.locals.userData = {
						email_usuario: user.email_usuario
					}
			
					return res.render("userDetail", { user: usuario });
				}
				else{
					return res.render("login")
				}

				
			}

			else {
				return res.render("login")
			}
        
		 }) 

			

		

		}

		},
	// Logout
	logout: (req, res)=>{
		req.session.destroy();
		res.clearCookie("cookie_recordarme")
		return res.redirect("/")
	},
	
}

module.exports=controller


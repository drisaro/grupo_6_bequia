const fs = require('fs');
const path = require('path');
const {validationResult}=require('express-validator');

const userFilePath = path.join(__dirname, '../data/usersDataBase.json');

function readDBFiltered() {
	let users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
	return users.filter(user => user.mostrar);
}

function readDB() {
	return JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
}


const controller = {
    // Root - Show all users
    index: (req, res) => {
        let userList=readDBFiltered()
        res.render("users",{userList})
    },
   // Detail - Detail from one user
   user: (req, res) => {
	const id = req.params.id;
    const users = readDB();
	const user = users.find(user => user.id == id);
	return res.render("userDetail", { user});
	},  
	// Delete - Delete one user from DB
	destroy : (req, res) => {
		const id = req.params.id;
        let users = readDB();
		users = users.map(user => {
			if(user.id == id){
				user.mostrar = false
			}
			return user;
		});
		fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))
		return res.redirect("/usuarios");
	},
     // Update - Form to edit
     editUser: (req, res) => {
		const id = req.params.id;
        const users = readDB();
		const user = users.find(user => user.id == id);
		return res.render("updateUser", { user });
    },
	// Update - Form to save changes
	updateUser: (req, res) => {
		const id = req.params.id;
		let users = readDB();
		users = users.map(user => {

			if(user.id == id){
				user.nombre_usuario = req.body.nombre_usuario,
                user.apellidos_usuario = req.body.apellidos_usuario,
                user.email_usuario = req.body.email_usuario,
                user.password_usuario = req.body.password_usuario,
                user.categoria_usuario = req.body.categoria_usuario,

				user.imagen_usuario = req.file?.filename ?? user.imagen_usuario
			}

			return user;
		});
		fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))
		return res.redirect("/usuarios");
	},
        // Create - Form to create
    createUser: (req, res) => {
        res.render("createUser")
    },
	// Create - Form to save
    storeUser: (req, res) => {
		const resultValidation=validationResult(req)
		//return res.send(resultValidation.mapped())
		if(resultValidation.errors.length>0){
			return res.render('createUser',{
				errors:resultValidation.mapped(), //mapped convierte el array en un objeto literal
				oldData:req.body,
			})
		}else{
			const users = readDB();
			const usuarioNuevo = {
				id: users.length > 0 ? users[ users.length - 1 ].id + 1 : 1,
				...req.body,
				imagen_usuario: req.file?.filename ?? "default-image.png",
				mostrar:true
			}

			users.push(usuarioNuevo);
			fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))

			return res.redirect("/usuarios")
		}
 
	},

}

module.exports=controller

/*const controller = {
    index: (req, res) => {
        res.render("users.ejs")
        },

    login: (req, res) => {
        res.render("login.ejs")
        },

    register: (req, res) => {
        res.render("register.ejs")
    }
}

module.exports=controller*/

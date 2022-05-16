const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../src/data/usersDataBase.json');

function readDB() {
	return JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
}

function cookie_recordarme(req, res, next) {

    if (req.cookies.cookie_recordarme != undefined && req.session.user == undefined) {

        const users = readDB();

		const usuario = users.find(user => user.email_usuario == req.cookies.cookie_recordarme);

        if (usuario){

			req.session.user = { //se guardan aca porque ahi sabemos que pasaron las validaciones
				email_usuario: usuario.email_usuario
			}
		}
    };

    next();
}

module.exports = cookie_recordarme;
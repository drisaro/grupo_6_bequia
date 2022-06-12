module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        nombre_usuario: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        apellidos_usuario: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        email_usuario: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password_usuario: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        categoria_usuario: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        imagen_usuario: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        mostrar: {
            type:dataTypes.TINYINT(1),
            allowNull: false
        }
        
    };
    let config = {
        tableName:"usuarios",
        timestamps: false
    }
    const Usuario = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    return Usuario
};
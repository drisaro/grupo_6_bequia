module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria'; // esto debería estar en singular
    let cols = {
        id_categoria: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        descripcion_categoria: {
            type: dataTypes.TEXT(),
            allowNull: true
        }
    };
    let config = {
        tableName:"categorias",
        timestamps: false
    }
    const Categoria = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "id_categoria"
        });     

    }

    return Categoria
};
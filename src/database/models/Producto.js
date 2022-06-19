module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        nombre_producto: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        descripcion_producto: {
            type: dataTypes.TEXT(),
            allowNull: true
        },
        precio_producto: {
            type: dataTypes.DECIMAL(5,2).UNSIGNED,
            allowNull: false
        },
        imagen_producto: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        mostrar: {
            type:dataTypes.TINYINT(1),
            allowNull: false
        },
        id_categoria: dataTypes.INTEGER(10),
        id_color: dataTypes.INTEGER(10)
    };
    let config = {
        tableName:"productos",
        timestamps: false
    }
    const Producto = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Producto.associate = (models) => {
        Producto.belongsTo(models.Categoria, {
            as: "categorias",
            foreignKey: "id_categoria",  
        });

        Producto.belongsTo(models.Color, {
            as: "colores",
            foreignKey: "id_color",  
        });

        // Producto.belongsToMany(models.Color, {
        //     through: "producto_color)",
        //     foreignKey: "id_producto",
        //     otherKey: "id_color"
        // });
      

    }


    return Producto
};
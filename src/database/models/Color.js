module.exports = (sequelize, dataTypes) => {
    let alias = 'Color'; // esto debería estar en singular
    let cols = {
        id_color: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        nombre: {
            type: dataTypes.STRING(15),
            allowNull: false
        }
    };
    let config = {
        tableName:"colores",
        timestamps: false
    }
    const Color = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    Color.associate = (models) => {
        Color.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "id_color"
        });     
        // Color.belongsToMany(models.Producto, {
        //     through: "producto_color",
        //     foreignKey: "id_color",
        //     otherKey: "id_producto"
        // }) 

    }

    return Color
};
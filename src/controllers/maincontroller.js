const controller = {
    index: (req, res) => {
        
        const productos = [
        {
            titulo: "Carpaccio fresco",
            descripcion: "Entrada Carpaccio de salmón con cítricos",
            precio: "U$S 65.50"
        },
        {
            titulo: "Risotto de berenjena",
            descripcion: "Risotto de berenjena y queso de cabra",
            precio: "U$S 47.00"
        },
        {
            titulo: "Mousse de arroz",
            descripcion: "Mousse de arroz con leche y aroma de azahar",
            precio: "U$S 27.50"
        },
        {
            titulo: "Espárragos blancos",
            descripcion: "Espárragos blancos con vinagreta de verduras y jamón ibérico",
            precio: "U$S 37.50"
        }
    ];


    res.render("index", { productos: productos });}
}
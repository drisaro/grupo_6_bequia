
const {validationResult}=require('express-validator');

const db = require('../../database/models');  //permite interactuar con la BD
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Productos = db.Producto;
const Colores=db.Color;
const Categorias=db.Categoria;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // Root - Show all products
    list: (req, res) => {
		Productos.findAll({
			where: { mostrar: 1 }
		})
        .then(products=>{
			
			let respuesta = {
				meta: {
					status: res.statusCode,
					total: products.length,
					url: '/api/productos'
				},
				data: products
			}
		return res.status(200).json(respuesta);

        })
        
    },

	lastProduct: (req, res) => {
        Productos.findOne(
			{
			where: { mostrar: 1 },
            order : [
                ['id', 'DESC']
            ],
            limit: 1
        })
            .then(producto => {
				let respuesta = {
					meta: {
						status: res.statusCode,
						total: producto.length,
						url: '/api/productos/ultimo'
					},
					data: producto
				}
				return res.status(200).json(respuesta);

                // let respuesta = {
				// 	meta: {
				// 		status: res.statusCode,
				// 		url: '/api/productos/ultimo'
				// 	},
				// 	data: producto
				// }
				// return res.status(200).json(respuesta);
            });
    },
	
    // Create - Form to create
    createProduct:async (req, res) => {
		const listaColores = await Colores.findAll();
		const listaCategorias=await Categorias.findAll();
        res.render("createProduct",{ listaColores,listaCategorias } )
    },
	// Create - Form to save
    storeProduct: async (req, res) => {
		const resultValidation=validationResult(req)
		//return res.send(resultValidation.mapped())
		if(resultValidation.errors.length>0){
			const listaColores = await Colores.findAll();
		    const listaCategorias=await Categorias.findAll();
			console.log(req.body)
			return res.render('createProduct',{
				errors:resultValidation.mapped(), //mapped convierte el array en un objeto literal
				oldData:req.body,
				listaColores,
				listaCategorias
			})
		}else{

			try {
				//return res.send(req.body)
				await Productos.create({
					...req.body,
					imagen_producto: req.file?.filename ?? "default-image.png",
					mostrar:1
				});
				return res.redirect("/productos")
			} catch(err) {
				console.error(err)
			}
			
			
		}
 
	},
    // Update - Form to edit
    editProduct: async (req, res) => {
		const listaColores = await Colores.findAll();
		const listaCategorias=await Categorias.findAll();
		Productos.findByPk(req.params.id)
		.then(product => {
			//user.password_usuario=dcodeIO.bcrypt.hashSync(user.password_usuario, 10);
			res.render('updateProduct', {product,listaColores,listaCategorias});
		});
		// const id = req.params.id;
        // const products = readDB();
		// const product = products.find(product => product.id == id);
		// return res.render("updateProduct", { product });
    },
	// Update - Form to save changes
	updateProduct: async (req, res) => {

		try{

            await Productos.update({
                nombre_producto:req.body.nombre_producto,
				precio_producto: req.body.precio_producto,
		        id_categoria: req.body.id_categoria,
				descripcion_producto : req.body.descripcion_producto,
				id_color: req.body.id_color,
				imagen_producto: req.file?.filename ?? Productos.imagen_producto

            },
            {
                where: { id: req.params.id }
            });
            return res.redirect("/productos");
        } catch(err) {
            console.error(err)
        }

		// const id = req.params.id;
		// let products = readDB();
		// products = products.map(product => {

		// 	if(product.id == id){
		// 		product.nombre_producto = req.body.nombre_producto,
		// 		product.precio_producto = req.body.precio_producto,
		// 		product.categoria_producto = req.body.categoria_producto,
		// 		product.descripcion_producto = req.body.descripcion_producto,
		// 		product.color_producto = req.body.color_producto

		// 		product.imagen_producto = req.file?.filename ?? product.imagen_producto
		// 	}

		// 	return product;
		// });
		// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		// return res.redirect("/productos");
	},
    // Detail - Detail of buy chart
    carrito: (req, res) => {
        res.render("carrito")
    },
    // Detail - Detail from one product
    product: (req, res) => {
	
	Productos.findByPk(req.params.id)
	.then(product => {
		let respuesta = {
			meta: {
				status: res.statusCode,
				total: product.length,
				url: '/api/productos/:id'
			},
			data: product
		}
        return res.status(200).json(respuesta);
	});
    
	},
	// Delete - Delete one product from DB
	destroy : async (req, res) => {
		try {
            //await Usuarios.destroy(req.params.id)
			await Productos.update({
               mostrar:0
            },
            {
                where: { id: req.params.id }
            });
            return res.redirect("/productos")
        } catch(err)
        {console.error(err)}

		// const id = req.params.id;
        // let products = readDB();
		// products = products.map(product => {
		// 	if(product.id == id){
		// 		product.mostrar = false
		// 	}
		// 	return product;
		// });
		// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		// return res.redirect("/productos");
	}
}

module.exports=controller
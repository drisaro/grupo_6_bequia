const fs = require('fs');
const path = require('path');
const {validationResult}=require('express-validator');

const db = require('../database/models');  //permite interactuar con la BD
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Productos = db.Producto;
const Colores=db.Color;
const Categorias=db.Categoria;


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


function readDBFiltered() {
	let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products.filter(product => product.mostrar);
}

function readDB() {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // Root - Show all products
    index: (req, res) => {
		Productos.findAll({
			where: { mostrar: 1 }
		})
        .then(products=>{
            //return res.json(products)
			res.render("products",{productList:products,toThousand})
        })
        //let productList=readDBFiltered()
        //res.render("products",{productList,toThousand})
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
			// const products = readDB();
			// const productoNuevo = {
			// 	id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
			// 	...req.body,
			// 	imagen_producto: req.file?.filename ?? "default-image.png",
			// 	mostrar:true
			// }

			// products.push(productoNuevo);
			// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

			
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
	//const id = req.params.id;
    
	Productos.findByPk(req.params.id)
	.then(product => {
		
		res.render('productDetail', {product,toThousand});
	});

    //const products = readDB();
	//const product = products.find(product => product.id == id);
	//return res.render("productDetail", { product, toThousand });
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
const fs = require('fs');
const path = require('path');
const {validationResult}=require('express-validator');

const db = require('../database/models');  //permite interactuar con la BD
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Productos = db.Producto;


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
		Productos.findAll()
        .then(products=>{
            //return res.json(products)
			res.render("products",{productList:products,toThousand})
        })
        //let productList=readDBFiltered()
        //res.render("products",{productList,toThousand})
    },
    // Create - Form to create
    createProduct: (req, res) => {
        res.render("createProduct")
    },
	// Create - Form to save
    storeProduct: (req, res) => {
		const resultValidation=validationResult(req)
		//return res.send(resultValidation.mapped())
		if(resultValidation.errors.length>0){
			return res.render('createProduct',{
				errors:resultValidation.mapped(), //mapped convierte el array en un objeto literal
				oldData:req.body,
			})
		}else{
			const products = readDB();
			const productoNuevo = {
				id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
				...req.body,
				imagen_producto: req.file?.filename ?? "default-image.png",
				mostrar:true
			}

			products.push(productoNuevo);
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

			return res.redirect("/productos")
		}
 
	},
    // Update - Form to edit
    editProduct: (req, res) => {
		const id = req.params.id;
        const products = readDB();
		const product = products.find(product => product.id == id);
		return res.render("updateProduct", { product });
    },
	// Update - Form to save changes
	updateProduct: (req, res) => {
		const id = req.params.id;
		let products = readDB();
		products = products.map(product => {

			if(product.id == id){
				product.nombre_producto = req.body.nombre_producto,
				product.precio_producto = req.body.precio_producto,
				product.categoria_producto = req.body.categoria_producto,
				product.descripcion_producto = req.body.descripcion_producto,
				product.color_producto = req.body.color_producto

				product.imagen_producto = req.file?.filename ?? product.imagen_producto
			}

			return product;
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		return res.redirect("/productos");
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
	destroy : (req, res) => {
		const id = req.params.id;
        let products = readDB();
		products = products.map(product => {
			if(product.id == id){
				product.mostrar = false
			}
			return product;
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		return res.redirect("/productos");
	}
}

module.exports=controller
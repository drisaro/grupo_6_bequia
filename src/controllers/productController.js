const fs = require('fs');
const path = require('path');

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
        //let productList=products.filter(product=>product.mostrar)
        let productList=readDBFiltered()
        res.render("products",{productList,toThousand})
    },
    // Create - Form to create
    createProduct: (req, res) => {
        res.render("createProduct")
    },
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
				product.imagen_producto = req.file?.filename ?? "default-image.png"
			}
			return product;
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		return res.redirect("/productos");
    },
    // Update - Form to edit
    editProduct: (req, res) => {
		const id = req.params.id;
        const products = readDB();
		const product = products.find(product => product.id == id);
		return res.render("updateProduct", { product });
    },
    // 
    storeProduct: (req, res) => {
        const products = readDB();
		const productoNuevo = {
			id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
			...req.body,
			imagen_producto: req.file?.filename ?? "default-image.png",
            //imagen_producto: req.file.filename,
            //imagen_producto: "/images/Productos/main-ojotas2.jpeg",
            mostrar:true
		}

		products.push(productoNuevo);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		return res.redirect("/productos")
	},
    // Detail - Detail of buy chart
    carrito: (req, res) => {
        res.render("carrito")
    },
    // Detail - Detail from one product
    product: (req, res) => {
	const id = req.params.id;
    const products = readDB();
	const product = products.find(product => product.id == id);
	return res.render("productDetail", { product, toThousand });
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
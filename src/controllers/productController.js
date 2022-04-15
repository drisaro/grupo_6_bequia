const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // Root - Show all products
    index: (req, res) => {
        let productList=products.filter(product=>product.mostrar)
        res.render("products",{productList,toThousand})
    },
    // Create - Form to create
    createProduct: (req, res) => {
        res.render("createProduct")
    },
    // Create -  Method to store
    storeProduct: (req,res) => {
		const productoNuevo = {
			//id: si la long de productos es mayor a 0 hacé la lógica, sino poné 1 como valor de id
			id: products.length > 0 ? products[ products.length - 1 ].id + 1 : 1,
			nombre_producto : req.body.nombre_producto,
			precio_producto : req.body.precio_producto,
			categoria_producto : req.body.categoria_producto,
            color_producto : req.body.color_producto,
			descripcion_producto : req.body.descripcion_producto,
			/* imagen_producto : req.file?.filename ?? "default-image.png" */
		}

		products.push(productoNuevo);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		
		return res.redirect("/products")   
    },
    // Update - Form to edit
    editProduct: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => product.id == id);
		return res.render("updateProduct", { product });
    },
    // Update - Method to update
    updateProduct: (req, res) => {
        const id = req.params.id;
		products = products.map(product => {
			if(product.id == id){   
			nombre_producto = req.body.nombre_producto,
			precio_producto = req.body.precio_producto,
			categoria_producto = req.body.categoria_producto,
            color_producto = req.body.color_producto,
			descripcion_producto = req.body.descripcion_producto,
            //valido si viene una imágen
			//valido si existe la propiedad file dentro del req. Si existe pregunta por el filename y lo devuelve
			//si nono no (y devuelve lo que esté dentro de "", una imagen por default)
			imagen_producto = req.file?.filename ?? "default-image.png"
        }
			return product;
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		return res.redirect("/products");
	},
    // Detail - Detail of buy chart
    carrito: (req, res) => {
        res.render("carrito")
    },
    // Detail - Detail from one product
    product: (req, res) => {
	const id = req.params.id;
	const product = products.find(product => product.id == id);
	return res.render("productDetail", { product, toThousand });
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id;
		products = products.map(product => {
			if(product.id == id){
				product.mostrar = false
			}
			return product;
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		return res.redirect("/products");
	}
}

module.exports=controller
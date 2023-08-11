const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

// Productos
productManager.addProduct({
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 10,
  thumbnail: "ruta/imagen3.jpg",
  code: "ABC123",
  stock: 50,
});


// Obtener todos los productos
// const allProducts = productManager.getProducts();
// console.log("Todos los productos:", allProducts);

// Obtener un producto por su id
// const productById = productManager.getProductById(1);
// console.log("id 1:", productById);

// Actualizar un producto
// productManager.updateProduct(1, {
//   title: "Producto 1 Actualizado",
//   price: 15,
// });

// // Eliminar un producto
// productManager.deleteProduct(2);

productManager.saveProducts();
// productManager.loadProducts();

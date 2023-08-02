const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

// Productos
productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10,
  thumbnail: "ruta/imagen1.jpg",
  code: "ABC123",
  stock: 50,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 10,
  thumbnail: "ruta/imagen2.jpg",
  code: "ASD123",
  stock: 30,
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

// Obtener un producto por su id
const productById = productManager.getProductById(1);
console.log("id 1:", productById);

// Actualizar un producto
productManager.updateProduct(1, {
  title: "Producto 1 Actualizado",
  price: 15,
});

// Eliminar un producto
productManager.deleteProduct(2);

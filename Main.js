class ProductManager {
    constructor() {
      this.products = [];
      this.id = 0;
    }
  
    addProduct(product) {
      // Validación de campos
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        console.log("Todos los campos son obligatorios");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const existingProduct = this.products.find((p) => p.code === product.code);
      if (existingProduct) {
        console.log("El código del producto ya está en uso");
        return;
      }
  
      // Agregar el producto con un id que se vaya sumando
      const newProduct = { ...product, id: ++this.id };
      this.products.push(newProduct);
      console.log("Producto agregado exitosamente:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        console.log("Producto no encontrado");
      }
      return product;
    }
  }
  


  // Ejemplo
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
  
  // EJ de obtener todos los productos
  const allProducts = productManager.getProducts();
  console.log("Todos los productos:", allProducts);
  
  // Ej de obtener un producto por su id
  const productById = productManager.getProductById(1);
  console.log("id 1:", productById);
  
  // Ej de buscar un id que no existe
  const ProductoInexistente = productManager.getProductById(100);
  console.log("id 100:", ProductoInexistente);
  
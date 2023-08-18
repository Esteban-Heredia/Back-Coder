import fs from 'fs'

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.path = './data/products.json'; // Se especifica la ruta del archivo donde se guardarán los productos
    this.loadProducts(); // Cargamos los productos del archivo cuando se crea una instancia de la clase
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      // Establecemos el id con el valor máximo encontrado para asegurarnos de que los nuevos productos tengan ids únicos
      if (this.products.length > 0) {
        this.id = Math.max(...this.products.map((p) => p.id));
      }
    } catch (error) {
      // Si ocurre algún error al leer el archivo, asumimos que aún no hay productos y continuamos
      this.products = [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar los productos en el archivo:', error);
    }
  }

  addProduct(product) {
    // Validación de campos (mismos que los especificados en el enunciado)
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
    this.saveProducts(); // Guardamos los productos actualizados en el archivo
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

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Producto no encontrado");
      return;
    }

    // Actualizamos el producto con los nuevos valores proporcionados
    this.products[index] = { ...this.products[index], ...updatedProduct };
    this.saveProducts(); // Guardamos los productos actualizados en el archivo
    console.log("Producto actualizado exitosamente:", this.products[index]);
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Producto no encontrado");
      return;
    }

    // Eliminamos el producto del array
    const deletedProduct = this.products.splice(index, 1)[0];
    this.saveProducts(); // Guardamos los productos actualizados en el archivo
    console.log("Producto eliminado:", deletedProduct);
  }
}

export default ProductManager;
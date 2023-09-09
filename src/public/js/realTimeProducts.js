const socket = io();

const form = document.getElementById("textbox");
const log = document.getElementById("log");
const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const thumbnail = document.getElementById('thumbnail');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const idDelete = document.getElementById('deleteProducts')

form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const data= {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
    }
    socket.emit("agregar", data);
    console.log(data)
  }
);

idDelete.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
      socket.emit("eliminar", parseInt(idDelete.value));
      idDelete.value = "";
      console.log("asdasd")
    }
  });

socket.on("log", ({ products }) => {
  const productList = document.getElementById("log");
  productList.innerHTML = ""; // Limpia la lista de productos

  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.innerText = `ID:${product.id} --- ${product.title} --- Precio: $${product.price}`;
    productList.appendChild(listItem);
  });
});

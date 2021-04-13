//Todo el div que contiene los productos
let listaProductos = document.querySelector('#lista-productos');
let carritoHTML = document.querySelector('#carritoHTML');
listaProductos.addEventListener('click', agregarProducto);
carritoHTML.addEventListener('click', borrarProducto);
let carrito = [];
//cuando carga el documento traigo lo que tenga el local storage guardado en carrito
//o sino, el arreglo esta vacio
document.addEventListener('DOMContentLoaded', () => {
	carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	actualizarCarrito();
})


//Si hace click en la seccion que tiene productos
function agregarProducto(e) {
    e.preventDefault();
    console.log('click');
    //verifico si es en una etiqueta a
    if (e.target.classList.contains('interaction-añadir')) {
        //Me dirijo a su elemento padre y llego hasta el contenedor que encierra todo el prod
        const cardProducto = e.target.parentElement.parentElement;
        console.log(cardProducto)
        //Llamo a ObtenerDatosProducto y le paso el producto como referencia
        obtenerDatosProducto(cardProducto);
    }
}

function obtenerDatosProducto(cardproducto) {
    //creo un objeto con las propiedades del producto
    const producto = {
        nombre: cardproducto.querySelector('h1').textContent,
        imagen: cardproducto.querySelector('img').getAttribute('src'),
        precio: cardproducto.querySelector('p').textContent,
        cantidad: 1,
        id: cardproducto.querySelector('a').dataset.id
    }

    console.log(producto);
    //meto al array carrito
    carrito.push(producto);


    //actualizo el carrito en el html
    actualizarCarrito();


}


function actualizarCarrito() {

    carritoHTML.innerHTML = '';
    carrito.forEach(e => {
        let nombre = e.nombre;
        let imagen = e.imagen;
        let precio = e.precio;
        let cantidad = e.cantidad;
        let id = e.id;




        carritoHTML.innerHTML += `
        
            <div class="producto" id='producto'> 
                <div class="fila nombre "> 
                    <div class="img"> 
                         <img src="${imagen}" alt="">
                
                    </div>
                    <div class="nombreProd">
                         <p class='nombreProducto'>${nombre}</p>
                    </div>
                </div>

                <div class="fila precios ">
                    <p class="price">
                        Price:
                    </p>
                    <p class="valor">
                        ${precio}
                    </p>

                </div>

                <div class="fila cantidad ">
                    <p class="Quantity">
                        Quantity:
                    </p>
                    <input type="number" class='cantidad-input' min="1" value='${cantidad}'>
                </div>

                <div class="quitar">
                    <a href="" class='borrar-producto'  data-id="${id}">QUITAR</a>
                </div>
            </div>
        
        `
    });
    actualizarStorage()

}



function borrarProducto(e){
    //igual que al agregar, si hago click en todo el carrito
    e.preventDefault();
    //veo si hice click en algun elemento con la clase borrar-producto
    if (e.target.classList.contains('borrar-producto')) {
        //consigo su data-id
		const id = e.target.getAttribute('data-id');

		/* Filtro los productos con un id distinto al que se quiere borrar */
        //devuelve todo menos el que sea igual a ese data-id
		carrito = carrito.filter(producto => producto.id !== id);

		/* Actualizo carrito en el HTML y en el storage */
		actualizarCarrito();
		actualizarStorage();
	}

}
function actualizarStorage() {
	/* Guardamos en el localStorage el contenido del arreglo global carrito */
	localStorage.setItem('carrito', JSON.stringify(carrito));
}
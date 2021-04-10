const iconoCarrito = document.querySelector('#icono-menu');

carrito = document.querySelector('#carrito')

iconoCarrito.addEventListener('click',(e) =>{
    console.log('click')
    carrito.classList.toggle('activado');
    document.body.classList.toggle('opacity');
});
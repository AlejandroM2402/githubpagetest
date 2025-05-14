// Espera a que el DOM estÃ© completamente cargado antes de ejecutar el cÃ³digo
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencia al contenedor donde se mostrarÃ¡ el detalle del producto
    const contenedor = document.getElementById("detalle-producto");

    // Obtiene el producto guardado previamente en localStorage (bajo la clave 'productoDetalle')
    const producto = JSON.parse(localStorage.getItem("productoDetalle"));

    // Si hay un producto en localStorage, lo muestra en la pÃ¡gina
    if (producto) {
        contenedor.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" style="height: 250px; object-fit: cover;" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio.toLocaleString("es-CO")}</p>
                <p class="card-text">${producto.descripcion}</p>
                <button class="btn btn-agregar-carrito btn-primary" id="carrito"> Agregar al Carrito</button>
                <a href="index.html" class="btn btn-secondary">Volver</a>
            </div>
        `;

        // Obtiene referencia al botÃ³n "Agregar al Carrito"
        const btnAgregar = document.getElementById("carrito");

        // Escucha el click en el botÃ³n para agregar productos al carrito
        btnAgregar.addEventListener("click", function () {
            // Solicita al usuario cuÃ¡ntas unidades desea agregar
            let cantidad = parseInt(prompt("¿Cuantas unidades deseas agregar?"), 10);

            // Valida que la cantidad ingresada sea un nÃºmero positivo
            if (isNaN(cantidad) || cantidad <= 0) {
                alert("Cantidad no valida.");
                return;
            }

            // Obtiene el carrito guardado en localStorage, o lo inicializa vacÃ­o
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Busca si el producto ya existe en el carrito
            const productoExistente = carrito.find(p => p.id === producto.id);

            // Si ya existe, suma la cantidad
            if (productoExistente) {
                productoExistente.cantidad += cantidad;
            } else {
                // Si no existe, lo agrega al carrito con la cantidad indicada
                carrito.push({ ...producto, cantidad: cantidad });
            }

            // Calcula el total del carrito (precio Ã— cantidad de cada producto)
            let totalCarrito = 0;
            carrito.forEach(item => {
                totalCarrito += item.precio * item.cantidad;
            });

            // Guarda el carrito actualizado y el total en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("totalCarrito", totalCarrito);

            // Muestra un mensaje de confirmaciÃ³n al usuario
            alert(`${cantidad} unidad(es) agregadas al carrito. Total: $${totalCarrito.toFixed(2)}`);
        });

    } else {
        // Si no se encuentra el producto en localStorage, muestra un mensaje de error
        contenedor.innerHTML = "<p class='text-danger'>No se encontro el producto.</p>";
    }
});
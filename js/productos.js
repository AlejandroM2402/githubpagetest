// Espera a que el DOM estÃ© completamente cargado antes de ejecutar el cÃ³digo
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencia al contenedor donde se mostrarÃ¡n las tarjetas de productos
    const contenedor = document.getElementById("contenedor-productos");

    // Obtiene los productos guardados previamente en localStorage o inicializa un array vacÃ­o si no hay ninguno
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

    // Recorre cada producto guardado y crea una tarjeta (card) en el HTML
    productosGuardados.forEach((producto) => {
        // Crea un div para la tarjeta del producto
        const card = document.createElement("div");
        card.className = "col";

        // Define el contenido HTML de la tarjeta, incluyendo nombre, precio, imagen y botones
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" style="height: 250px; object-fit: cover;" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio.toLocaleString("es-CO")}</p>
                    <button class="btn btn-outline-secondary ver-detalle" data-id="${producto.id}">Info del producto</button>
                    <button class="btn btn-danger eliminar-producto" data-id="${producto.id}"> Eliminar</button>
                </div>
            </div>
        `;

        // Agrega la tarjeta al contenedor principal
        contenedor.appendChild(card);
    });

    // Escucha los clics dentro del contenedor (delegaciÃ³n de eventos)
    contenedor.addEventListener("click", function (e) {
        // Si el botÃ³n clickeado es "MÃ¡s informaciÃ³n"
        if (e.target.classList.contains("ver-detalle")) {
            const id = Number(e.target.dataset.id); // Obtiene el ID del producto
            const productos = JSON.parse(localStorage.getItem("productos")) || [];
            const producto = productos.find(p => p.id === id); // Busca el producto por ID

            if (producto) {
                // Guarda el producto en localStorage bajo la clave 'productoDetalle'
                localStorage.setItem("productoDetalle", JSON.stringify(producto));
                // Redirige a la pÃ¡gina de detalles
                window.location.href = "detalles.html";
            }
        }

        // Si el botÃ³n clickeado es "Eliminar"
        if (e.target.classList.contains("eliminar-producto")) {
            const id = Number(e.target.dataset.id); // Obtiene el ID del producto
            let productos = JSON.parse(localStorage.getItem("productos")) || [];
            // Filtra para quitar el producto con el ID correspondiente
            productos = productos.filter(p => p.id !== id);
            // Guarda la lista actualizada en localStorage
            localStorage.setItem("productos", JSON.stringify(productos));
            // Recarga la pÃ¡gina para actualizar la lista mostrada
            location.reload();
        }
    });
});
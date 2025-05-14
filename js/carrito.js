// Espera a que el DOM estÃ© completamente cargado antes de ejecutar el cÃ³digo
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencias a los elementos del DOM
    const contenedorCarrito = document.getElementById("carrito-contenedor");
    const totalSpan = document.getElementById("total");
    const vaciarBtn = document.getElementById("vaciar-carrito");
    const finalizarBtn = document.getElementById("finalizar-compra");

    // Obtiene el carrito almacenado en localStorage o inicializa como array vacÃ­o
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // FunciÃ³n para renderizar (dibujar) los productos en el carrito
    function renderizarCarrito() {
        // Limpia el contenedor antes de renderizar
        contenedorCarrito.innerHTML = "";

        // Si el carrito estÃ¡ vacÃ­o, muestra un mensaje y pone total en $0
        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = "<p class='text-center'>Tu carrito esta vacio</p>";
            totalSpan.textContent = "$0";
            return;
        }

        // Recorre cada producto del carrito y genera el HTML para mostrarlo
        carrito.forEach((producto, index) => {
            const subtotal = producto.precio * producto.cantidad;

            contenedorCarrito.innerHTML += `
                <div class="card mb-3">
                    <div class="row g-0 align-items-center">
                        <div class="col-md-3">
                            <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">Precio: $${producto.precio.toLocaleString("es-CO")}</p>
                                <p class="card-text">Cantidad: ${producto.cantidad}</p>
                                <p class="card-text fw-bold">Subtotal: $${subtotal.toLocaleString("es-CO")}</p>
                            </div>
                        </div>
                        <div class="col-md-3 text-end pe-3">
                            <button class="btn btn-danger eliminar" data-index="${index}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        });

        // Calcula y muestra el total general del carrito
        calcularTotal();
    }

    // FunciÃ³n para calcular el total de todos los productos del carrito
    function calcularTotal() {
        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        totalSpan.textContent = `$${total.toLocaleString("es-CO")}`;
    }

    // Evento para eliminar un producto del carrito al hacer click en su botÃ³n
    contenedorCarrito.addEventListener("click", function (e) {
        if (e.target.classList.contains("eliminar")) {
            const index = e.target.getAttribute("data-index");
            carrito.splice(index, 1); // Elimina el producto del array
            localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza localStorage
            renderizarCarrito(); // Vuelve a renderizar el carrito
        }
    });

    // Evento para vaciar todo el carrito al hacer click en el botÃ³n correspondiente
    vaciarBtn.addEventListener("click", function () {
        if (confirm("estas seguro de vaciar el carrito?")) {
            carrito = []; // VacÃ­a el array del carrito
            localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza localStorage
            renderizarCarrito(); // Vuelve a renderizar el carrito vacÃ­o
        }
    });

    // Evento para finalizar la compra al hacer click en el botÃ³n correspondiente
    finalizarBtn.addEventListener("click", function () {
        if (carrito.length > 0) {
            alert("¡Gracias por tu compra!"); // Muestra mensaje de agradecimiento
            carrito = []; // VacÃ­a el carrito
            localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza localStorage
            renderizarCarrito(); // Vuelve a renderizar el carrito vacÃ­o
        } else {
            alert("Tu carrito esta vacio."); // Avisa si no hay productos
        }
    });

    // Renderiza el carrito apenas carga la pÃ¡gina, para mostrar lo que habÃ­a guardado
    renderizarCarrito();
});
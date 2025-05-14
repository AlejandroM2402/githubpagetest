// Espera a que el DOM este completamente cargado antes de ejecutar el codigo
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencia al formulario de agregar producto
    const formulario = document.getElementById("form-agregar-producto");
    
    // Verifica si el formulario existe en la pagina
    if (formulario) {
        // Escucha el evento submit (envio) del formulario
        formulario.addEventListener("submit", function (e) {
            e.preventDefault(); // Evita que se recargue la pagina al enviar el formulario

            // Obtiene los valores de los campos del formulario
            const nombre = document.getElementById("nombre").value;
            const precio = parseFloat(document.getElementById("precio").value);
            const descripcion = document.getElementById("descripcion").value;
            const imagenInput = document.getElementById("imagen");

            // Obtiene el archivo de imagen seleccionado
            const file = imagenInput.files[0];
            const reader = new FileReader(); // Crea un lector de archivos

            // Cuando el lector termine de leer la imagen, ejecuta esta funcion
            reader.onload = function () {
                const imagenBase64 = reader.result; // Obtiene la imagen en formato Base64

                // Crea un nuevo objeto de producto con datos del formulario
                const nuevoProducto = {
                    id: Date.now(), // Genera un ID unico basado en la fecha/hora actual
                    nombre,
                    precio,
                    descripcion,
                    imagen: imagenBase64
                };

                // Obtiene los productos guardados previamente en localStorage, o inicia un array vacÃ­o
                const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
                
                // Agrega el nuevo producto al array de productos
                productosGuardados.push(nuevoProducto);

                // Guarda el array actualizado en localStorage
                localStorage.setItem("productos", JSON.stringify(productosGuardados));

                // Muestra una alerta de confirmaciÃ³n
                alert("¡Producto agregado correctamente!");
                
                // Resetea el formulario para limpiarlo
                formulario.reset();
            };

            // Si se selecciona un archivo de imagen, lo lee como Data URL (Base64)
            if (file) {
                reader.readAsDataURL(file);
            } else {
                // Si no se selecciona imagen, muestra una alerta al usuario
                alert("Por favor selecciona una imagen.");
            }
        });
    }
});
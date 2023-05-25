//Función para mostrar el contenido del archivo

function guardarArchivo(title, content) {
    const url = 'http://localhost:3000/';
    const data = {
        title: title,
        content: content
    };
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(url, request)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.querySelector("#message").innerHTML = "<p>Archivo guardado exitosamente.</p>";
                mostrarListadoArchivos(); 
            } else {
                document.querySelector("#message").innerHTML = "<p>Error al guardar el archivo.</p>";
            }
        });
}

function mostrarListadoArchivos() {
    fetch('http://localhost:3000/priv')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const archivos = data.files;
                const listaArchivos = document.querySelector('#listaArchivos');
                listaArchivos.innerHTML = ''; // Limpiar la lista antes de agregar los elementos


                archivos.forEach(archivo => {
                    const listItem = document.createElement('li');
                    listItem.textContent = archivo;
                    listaArchivos.appendChild(listItem);
                });


                const ultimoArchivo = archivos[archivos.length - 1];
                const ultimoArchivoItem = document.createElement('li');
                ultimoArchivoItem.textContent = ultimoArchivo;
                listaArchivos.insertBefore(ultimoArchivoItem, listaArchivos.firstChild);
            } else {
                console.error('Error al obtener el listado.');
            }
        });
}

function sincronizarListado() {
    setInterval(() => {
        mostrarListadoArchivos();
    }, 500); 
}

document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    document.querySelector('#markupForm').onsubmit = () => {
        guardarArchivo(title.value, content.value);
        return false;
    };

    function sincronizarListado() {
        setInterval(() => {
            mostrarListadoArchivos();
        }, 500); 
    }
    
    mostrarListadoArchivos();
    sincronizarListado(); 
});
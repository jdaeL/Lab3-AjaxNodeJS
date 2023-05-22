function recitar(title, content) {
    const url = 'http://localhost:3000/'
    const data = {
        title: title,
        content: content
    }
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(url, request)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.querySelector("#message").innerHTML = "<p>Archivo guardado exitosamente.</p>";
            } else {
                document.querySelector("#message").innerHTML = "<p>Error al guardar el archivo.</p>";
            }
        })
}


document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    document.querySelector('#markupForm').onsubmit = () => {
        recitar(title.value, content.value);
        return false;
    }
})

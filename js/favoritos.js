export function mostrarFavoritos() {
    const lista = document.getElementById("lista-favoritos");

    lista.innerHTML = "";

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No has guardado imágenes aún.";
        li.className = "list-group-item bg-transparent text-white small px-0";
        lista.appendChild(li);
        return;
    }

    favoritos.forEach(favorito => {
        const li = document.createElement("li");

        li.textContent = `${favorito.date} - ${favorito.title}`;
        li.className = "list-group-item bg-transparent text-white px-0";
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            mostrarFavoritoGuardado(favorito);
        });

        lista.appendChild(li);
    });
}

function mostrarFavoritoGuardado(favorito) {
    const pantalla = document.getElementById("pantalla-principal");

    pantalla.innerHTML = `
        <h2 class="text-info mb-3">${favorito.title || "Sin título"}</h2>
        <p class="text-white">${favorito.date || "Sin fecha"}</p>

        ${
            favorito.media_type === "image"
                ? `<img src="${favorito.url}" class="img-fluid rounded mb-3" alt="${favorito.title || "APOD"}">`
                : `<iframe src="${favorito.url}" class="w-100 mb-3" height="400" allowfullscreen></iframe>`
        }

        <p class="text-white text-start">${favorito.explanation || "Sin descripción disponible."}</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarFavoritos();
});
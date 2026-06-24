import { mostrarAPOD, obtenerAPODActual } from "./app.js";

document.getElementById("btn-favorito").addEventListener("click", guardarFavorito);

function guardarFavorito() {
    const apodActual = obtenerAPODActual();

    if (!apodActual) {
        alert("No hay una imagen cargada para guardar.");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe = favoritos.some(
        favorito => favorito.date === apodActual.date
    );

    if (!existe) {
        favoritos.push(apodActual);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        mostrarFavoritos();
    } else {
        alert("Este APOD ya está en favoritos.");
    }
}

export function mostrarFavoritos() {
    const lista = document.getElementById("lista-favoritos");

    lista.innerHTML = "";

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No has guardado imágenes aún.";
        li.className = "list-group-item bg-transparent text-muted small px-0";
        lista.appendChild(li);
        return;
    }

    favoritos.forEach(favorito => {
        const li = document.createElement("li");

        li.textContent = `${favorito.date} - ${favorito.title}`;
        li.className = "list-group-item bg-transparent text-white px-0";
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            mostrarAPOD(favorito);
        });

        lista.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarFavoritos();
});
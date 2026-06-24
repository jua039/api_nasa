import { mostrarFavoritos } from "./favoritos.js";

let apodActual = null;

export function obtenerAPODActual() {
    return apodActual;
}

export async function cargarAPOD(fecha = "") {
    const pantalla = document.getElementById("pantalla-principal");

    pantalla.innerHTML = `
        <div class="py-5">
            <div class="spinner-border text-info mb-3" role="status"></div>
            <p class="text-white">Conectando con los telescopios de la NASA...</p>
        </div>
    `;

    try {
        const url = fecha
            ? `http://localhost:3000/api/apod?date=${fecha}`
            : "http://localhost:3000/api/apod";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }

        const data = await response.json();

        console.log("Respuesta de la API:", data);

        if (data.error || data.msg) {
            throw new Error(data.error?.message || data.msg || "Error de la API");
        }

        apodActual = data;

        mostrarAPOD(data);

    } catch (error) {
        console.error("Error real:", error);

        pantalla.innerHTML = `
            <p class="text-danger">Error al cargar la API.</p>
            <p class="text-muted">${error.message}</p>
        `;
    }
}

export function mostrarAPOD(data) {
    const pantalla = document.getElementById("pantalla-principal");

    if (!data) {
        pantalla.innerHTML = `<p class="text-white ">No hay datos para mostrar.</p>`;
        return;
    }

    pantalla.innerHTML = `
        <h2 class="text-info mb-3">${data.title || "Sin título"}</h2>
        <p class="text-white">${data.date || "Sin fecha"}</p>

        ${
            data.media_type === "image"
                ? `<img src="${data.url}" class="img-fluid rounded mb-3" alt="${data.title || "APOD"}">`
                : `<iframe src="${data.url}" class="w-100 mb-3" height="400" allowfullscreen></iframe>`
        }

        <p class="text-white text-start">${data.explanation || "Sin descripción disponible."}</p>

        <div class="mt-3">
            <button id="btn-favorito" class="btn btn-outline-warning">
                ⭐ Guardar en Mis Favoritos
            </button>
        </div>
    `;

    document
        .getElementById("btn-favorito")
        .addEventListener("click", guardarFavorito);
}

function guardarFavorito() {
    if (!apodActual) {
        alert("No hay APOD cargado para guardar.");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe = favoritos.some(
        favorito => favorito.date === apodActual.date
    );

    if (existe) {
        alert("Este APOD ya está en favoritos.");
        return;
    }

    favoritos.push(apodActual);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarFavoritos();
}

document.addEventListener("DOMContentLoaded", () => {
    cargarAPOD();
});
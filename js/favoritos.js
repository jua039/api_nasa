document.getElementById("btn-favorito").addEventListener("click", guardarFavorito);

let apodActual =null;



function guardarFavoritos(){
   let cart = JSON.parse(localStorage.getItem("favoritos")) || [];//Crea o recupera el carrito 
    const   existe =favoritos.some(
        favorito => favorito.date === apodActual.date

    );
    if (!existe){
        favoritos.push(apodActual);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favorito)
        );
        mostrarFavoritos();
    }
}

function mostrarFavoritos() {

    const lista = document.getElementById("lista-favoritos");

    lista.innerHTML = "";

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.forEach(favorito => {

        const li = document.createElement("li");

        li.textContent =
            `${favorito.date} - ${favorito.title}`;

        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            mostrarAPOD(favorito);
        });

        lista.appendChild(li);
    });
}


//Cargar favoritos al iniciar la pag
document.addEventListener("DOMContentLoaded", () => {

    cargarAPOD();

    mostrarFavoritos();
});


export function guardarFavorito(apod) { ... }

export function obtenerFavoritos() { ... }

export function mostrarFavoritos() { ... }
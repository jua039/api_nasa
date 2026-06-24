import { cargarAPOD } from "./app.js";

const fecha = document.getElementById("selector-fecha");

const hoy = new Date();
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");

const fechaActual = `${anio}-${mes}-${dia}`;

function limitarFecha() {
    fecha.max = fechaActual;
    fecha.min = "1995-06-16";
}

function validarFecha() {
    const fechaAsignada = fecha.value;

    if (!fechaAsignada) {
        return;
    }

    if (fechaAsignada > fechaActual) {
        alert("No puedes seleccionar una fecha futura.");
        fecha.value = "";
        return;
    }

    cargarAPOD(fechaAsignada);
}

limitarFecha();


//validarFecha();
fecha.addEventListener("change", validarFecha);
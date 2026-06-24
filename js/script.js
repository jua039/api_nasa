let fecha = document.getElementById('selector-fecha')

let hoy = new Date();
let anio = hoy.getFullYear();
let mes = String(hoy.getMonth() + 1).padStart(2, '0');
let dia = String(hoy.getDate()).padStart(2, '0');
let fechaActual = `${anio}-${mes}-${dia}`;


function limitarPositivo(){
    
    fecha.max = fechaActual;
    fecha.min = '1995-06-16'
}

limitarPositivo();

function validarFecha(){
    let fechaAsignada = fecha.value;

    if(fechaAsignada > fechaActual){
        alert("Esta fecha no sirve")
        fecha.value = "";
    }else{
        console.log("Redirigiendo");
        
    }
}

validarFecha();
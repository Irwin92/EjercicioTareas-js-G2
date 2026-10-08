"use strict";//Activa el modo estricto en JS -Hace que javascript sea mas exigente

const tareas = []; //tareas es un arreglo donde se guardan las tareas y cada tarea será un objeto
let siguienteId = 1;//siguienteId genera un identificador diferente para cada tarea
let filtroActual = "todas";//filtroActual indica que mostrar: todas, pendientes o completas

/*
 * Referencias al DOM 
 * querySelector() busca elementos del HTML usando selectores CSS
 */
const formulario = document.querySelector("#formulario");
const campoTitulo = document.querySelector("#titulo");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const vacio = document.querySelector("#vacio");
const filtros = document.querySelector(".filtros");
//-----------------------------------------------------------------------------------------
/**
 * Metodo que le agrega un eventlistener al formulario y agrega una tarea en el arreglo
 */
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //Evita que el formulario recargue la pagina

    //Obtiene el texto y elimina espacio externos
    const titulo = campoTitulo.value.trim();

    //Se valida que haya texto 
    if (!titulo) {
        mensaje.textContent =
            "Escriba una descripción antes de agregar.";
        campoTitulo.focus();
        return;
    }
    //Se crea el objeto tarea
    const nuevaTarea = {
        id: siguienteId,
        titulo: titulo,
        completada: false
    };

    //Guardar la tarea en el arreglo
    tareas.push(nuevaTarea);

    //Preparar el id para la siguiente tarea
    siguienteId++;

    //Util para ver desde la consola las tareas que se van agregando 
    console.log("Tareas actuales: ", tareas);

    //Limpiamos rl formulario
    formulario.reset();
    mensaje.textContent = "";
    campoTitulo.focus();

    //Se llama al metodo que carga la lista de tareas
    renderizar();
});
//------------------------------------------------------------------------------------------------
/**
 * Obtener las tarea visibles
 * el filter() crea un nuevo arreglo con los elementos que cumplan una condicion
 */
function obtenerTareasVisibles() {
    if (filtroActual === "pendientes") {
        return tareas.filter((tarea) => !tarea.completada);
    }
    if (filtroActual === "completadas") {
        return tareas.filter((tarea) => tarea.completada);
    }
    return tareas;
}
//------------------------------------------------------------------------------------------------
/**
 * Renderizar toma los datos de JavaScript y los muestra en el HTML en la lista
 */
function renderizar() {
    //Limpia la lista visual antes de volver a cargarse
    lista.replaceChildren();

    const visibles = obtenerTareasVisibles();

    for (const tarea of visibles){
        //Crear <li>
        const item = document.createElement("li");
        item.className= "tarea";

        //Agrega o quita la clase "completada"
        item.classList.toggle("completada", tarea.completada);

        //Se crea el texto de la tarea
        const titulo = document.createElement("span");
        titulo.className = "titulo-tarea";
        titulo.textContent = tarea.titulo;

        //Contenedor de los botones
        const acciones = document.createElement("div");
        item.className= "acciones";

        //Botón completar
        const completar = document.createElement("button");
        completar.type="button";

        //dataset agrega informacion personalizada al boton
        completar.dataset.accion = "alternar";
        completar.dataset.id = String(tarea.id);

        completar.textContent =
            tarea.completada ? "Reabrir" : "Completar";

        completar.setAttribute(
            "aria-label",
            `${completar.textContent}: ${tarea.titulo}`
        );
        //Boton Eliminar
        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "eliminar";
        eliminar.dataset.accion = "eliminar";
        eliminar.dataset.id = String(tarea.id);
        eliminar.textContent= "Eliminar";

        eliminar.setAttribute(
            "aria-label",
            `Eliminar: ${tarea.titulo}`
        );
        //Insertar elementos
        acciones.append(completar, eliminar);
        lista.append(titulo, acciones);
        lista.append(item);

        //Contar pendientes
        

    }//Fin del for

}

//------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------
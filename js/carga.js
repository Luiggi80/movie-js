/* Se tendra un objeto que es la Pelicula, que contiene un array
- Nombre Pelicula
- Año
- Actores
- Director
- Ranking 1
- Ranking 2
- Ranking Personal
*/


// Genero Array vacio que voy a cargar con los OBJETOS de Peliculas y key del storage
const CLAVE = "key_peliculas"


// Genero clase y constructor del OBJETO pelicula
// Genero dentro de la clase el METODO de mostrarPeliculas
class Pelicula {
    constructor(nombre, tipo, anio, actores, director, rankingme, fechaCarga) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.anio = anio;
        this.actores = actores;
        this.director = director;
        this.rankingme = rankingme;
        this.fechaCarga = fechaCarga;
    }


// Función para crear formato a insertar en el HTML con la info de la pelicula a Mostrar que esté en Storage
    mostrarPelicula() {
        return `
        <div class="card card-peli col-4">
            <div class="card-body">
                <h5 class="card-title">Titulo: ${this.nombre}</h5>
                <h4 class="card-text">Tipo: ${this.tipo}</h4>
                <div>Año: ${this.anio}</div>
                <div>Ranking Me: ${this.rankingme}</div>
            </div>
        </div>
    `;
    }

    mostrarMensajeCarga() {
        return `
                <h6 class="card-title estiloOK" id="datosCargados">Se ha cargado correctamente la ${this.tipo} "${this.nombre}"</h6>
    `;
    }

}

function existeEnStorage(clave) {
    let existe = true;
    if (!localStorage.getItem(clave)) {
        existe = false;
    }
    return existe;
}


// Guardado de objeto en Storage Local como JSON
function guardarEnStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Recupero los datos del Storage que estan como JSON
function obtenerDatosDeStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}


// Genero Funcion para tomar los datos del Formulario y guardarlo en el LocalStorage
function cargarPeliculaFormulario() {
    // Inicializo array de peliculas a cargar
    let peliculas = [];

    // Recupero info del formulario
    const nombre = document.getElementById("pelicula_nombre").value;
    const tipo = document.getElementById("pelicula_tipo").value;
    const anio = document.getElementById("pelicula_anio").value;
    const actores = document.getElementById("pelicula_actores").value;
    const director = document.getElementById("pelicula_director").value;
    const rankingme = document.getElementById("pelicula_rankingme").value;

    // Verifico si algún dato está vacio
    if (!esDatoVacio(nombre) &&
        !esDatoVacio(tipo) &&
        !esDatoVacio(anio) &&
        !esDatoVacio(actores) &&
        !esDatoVacio(director) &&
        !esDatoVacio(rankingme)) {

        //Creo la fecha de Carga y autocompleto lo que no tengo dato
        let fechaCarga = new Date();
        // Creo el Objeto Pelicula con los datos ingresados
        const pelicula = new Pelicula(nombre, tipo, anio, actores, director, rankingme, fechaCarga);
        // Cargo el Objeto creado en el array de peliculas
        peliculas.push(pelicula);

        // Verifico si la Clave de peliculas ya está en el Storage. Si no esta, guardo el array. 
        // Si esta, primero me traigo la lista del Storage, concateno el array y guardo el array
        if (!existeEnStorage(CLAVE)) {
            guardarEnStorage(CLAVE, peliculas); // si no existe el key peliculas, agrego el array
            document.getElementById("formulario_carga").reset();
            $("#mensajeSalidaGuardar").html("");
            $("#mensajeSalidaGuardar").append(pelicula.mostrarMensajeCarga());
            $("#datosCargados").fadeOut(4000);

        } else {
            let listaEnStorage = [];
            listaEnStorage = obtenerDatosDeStorage(CLAVE); // si existe el key peliculas concateno lo que está en el storage
            listaEnStorage = listaEnStorage.concat(peliculas);
            guardarEnStorage(CLAVE, listaEnStorage);
            document.getElementById("formulario_carga").reset();
            $("#mensajeSalidaGuardar").html("");
            $("#mensajeSalidaGuardar").append(pelicula.mostrarMensajeCarga());
            $("#datosCargados").fadeOut(4000);
        }


    } else {
        // Borro el contenedor de mensaje de Salida al Guardar
        $("#mensajeSalidaGuardar").html("");
        $("#mensajeSalidaGuardar").append(`<h6 class="card-title estiloError" id="sinDatosCargados">No pusiste algun Dato... fijate bien</h6>`);
        $("#sinDatosCargados").slideUp(3000);
    }

}

// Verificacion de campo con caracteres
function esDatoVacio(valor) {
    if (valor.length == 0) {
        return true;
    }
    return false;
}

function mostrarPeliculasWeb() {

    //Inicializo array almacenado para recuperar Storage
    let almacenado = [];
    //Inicializo array listaPeliculas para guardar como objetos los strings del array
    let listaPeliculas = [];
    //Borro contenido del div donde mostrar resultado de Mostrar para que no se repita
    $("#cardContainer").html("");
    //Recupero el Storage
    almacenado = obtenerDatosDeStorage(CLAVE);
    if (!existeEnStorage(CLAVE)) {
        $("#cardContainer").append(`
        <h6 class="card-title estiloError">No existen Peliculas cargadas en el Storage</h5>
`);
    } else {
        //Itero almacenados con for...of para transformar todos sus objetos a tipo 
        for (const objeto of almacenado) {
            listaPeliculas.push(new Pelicula(objeto.nombre, objeto.tipo, objeto.anio, objeto.actores, objeto.director, objeto.rankingme, objeto.fechaCarga));
        }
        for (const item of listaPeliculas) {
            // Armamos la card de cada libro
            $("#cardContainer").append(item.mostrarPelicula());

        }
    }
}


function borrarStorage() {
    localStorage.clear();
}

document.getElementById("formulario_carga").addEventListener("submit", (event) => {
    event.preventDefault();
    cargarPeliculaFormulario();

});

document.getElementById("btn_mostrar").addEventListener("click", (event) => {
    event.preventDefault();
    mostrarPeliculasWeb();
    $("#formulario_carga").slideUp(1000);
    // $("#mostrar").show();
    $(".mostrarBotones").show();
});

document.getElementById("btn_borrar").addEventListener("click", (event) => {
    event.preventDefault();
    borrarStorage();
    mostrarPeliculasWeb();
    $("#formulario_carga").slideUp(1000);
    $(".mostrarBotones").show();
});
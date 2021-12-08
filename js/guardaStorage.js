// Genero clase y constructor del OBJETO pelicula para GUARDAR
class PeliculaGuardar {
    constructor(id, nombre, tipo, anio, actores, director, ratingImdb, ratingRT, ratingMC, fechaCarga) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.anio = anio;
        this.actores = actores;
        this.director = director;
        this.ratingImdb = ratingImdb;
        this.ratingRT = ratingRT;
        this.ratingMC = ratingMC;
        this.fechaCarga = fechaCarga;
    }
};

// Funciones manipular el Storage
// Verifico existencia de key 
function existeEnStorage(clave) {
    let existe = true;
    if (!localStorage.getItem(clave)) {
        existe = false;
    }
    return existe;
};

// Guardado de objeto en Storage Local como JSON
function guardarEnStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
};

// Recupero los datos del Storage que estan como JSON
function obtenerDatosDeStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
};
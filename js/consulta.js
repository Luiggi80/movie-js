let apiconpeli;
let respuesta = [];
let pelisAPI = [];
const CLAVE = "key_peliculasconsultadas";

// $(document).ready(function() {
//     //cambios en el DOM
//     obtenerPelicula();
// });


$("#btn_consultar_pelicula").on('click', function (event) {
    $("#listaconsultapelis").empty();
    event.preventDefault();
    obtenerPelicula();
});



function obtenerPelicula() {
    // Busco input de busqueda y armo el API con key y peli
    const pelibusqueda = document.getElementById("pelicula_busqueda").value;
    console.log(pelibusqueda);
    const APIKEY = "b1441511";
    const APIBUSQUEDA = "http://www.omdbapi.com/?r=json";
    apiconpeli = APIBUSQUEDA + "&apikey=" + APIKEY + "&s=" + pelibusqueda;
    console.log(apiconpeli);

    // Hago consulta con AJAX
    // const APIBUSQUEDARANKING = "http://www.omdbapi.com/?iapikey=b1441511&t=batman&plot=full";
    $.ajax({
        method: "GET",
        url: apiconpeli,
        success: function (respuesta) {
            console.log(respuesta);
            // Verifico si la respuesta contiene una pelicula valida o no existe
            if (respuesta.Response == "False") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: respuesta.Error,
                    footer: 'Fijate que quizas lo pusiste mal o dejaste el campo vacio... Probá de nuevo!'
                });
            } else {

                // En funcion a la respuesta, me quedo con el array Search que es donde esta el listo y lo muestro en una lista abajo
                let pelisAPI = respuesta.Search;
                for (const item of pelisAPI) {
                    $("#listaconsultapelis").append(`<li class="col-sm-3 list-group-item">
                <img class="img-fluid" src="${item.Poster}">
                <h4>${item.Title}</h4>
                <h5>Año: ${item.Year}</h5>
                <h6>Tipo: ${item.Type}</h6>
                <button class="btn btn-success" id="btn_rating${item.imdbID}">Ratings</button>
                <button class="btn btn-danger" id="btn_guardar${item.imdbID}">Guardar</button>
                </li>`);
                    // Genero un boton para cada portada que realizo una nueva consulta mas detallada
                    $(`#btn_rating${item.imdbID}`).on('click', function () {
                        obtenerRatingsPelicula(item.imdbID);
                    });
                    $(`#btn_guardar${item.imdbID}`).on('click', function () {
                        guardarRatingsPelicula(item.imdbID);
                    });
                };
            };
        },

    });

};

// Funcion para tener más detalle de la peli donde, por ejemplo, se obtiene la calificación

function obtenerRatingsPelicula(id) {
    // Busco input de busqueda y armo el API con key y peli
    let codigoIMDB = id;
    console.log(codigoIMDB);
    const APIKEY = "b1441511";
    const APIBUSQUEDA = "http://www.omdbapi.com/?r=json&plot=full";
    apiconid = APIBUSQUEDA + "&apikey=" + APIKEY + "&i=" + codigoIMDB;
    console.log(apiconid);

    // Hago consulta con AJAX a traves de ID que brinda más información puntual
    $.ajax({
        method: "GET",
        url: apiconid,
        success: function (respuestaId) {
            console.log(respuestaId);
            largoRatings = respuestaId.Ratings.length;
            console.log(largoRatings);

            // En funcion a la respuesta NORMALIZO (de 0 a 100) y ORGANIZO las notas ya que no siempre viene Array completo
            //Inicializo Variables
            let ratingImdb = 0;
            let ratingRT = 0;
            let ratingMC = 0;
            let avgRanking = 0;

            for (var i = 0; i < largoRatings; i++) {
                switch (respuestaId.Ratings[i].Source) {
                    case 'Internet Movie Database':
                        // IMDB viene como X/10
                        ratingImdb = parseFloat(respuestaId.Ratings[i].Value) * 10;
                        break;
                    case 'Rotten Tomatoes':
                        // RT viene como X%
                        ratingRT = parseFloat(respuestaId.Ratings[i].Value);
                        break;
                    case 'Metacritic':
                        // MC viene como X/100
                        ratingMC = parseFloat(respuestaId.Ratings[i].Value);

                        break;
                }
            };


            console.log(ratingImdb);
            console.log(ratingRT);
            console.log(ratingMC);

            avgRanking = ((ratingImdb + ratingRT + ratingMC) / largoRatings).toFixed(1);
            console.log(avgRanking);

            // Genero MODAL con Sweet Alter para mirar las NOTAS!
            Swal.fire(
                respuestaId.Title,
                '<b> Calificacion Avg <big>' + avgRanking + '</big></b><small> over </small>' + largoRatings + '/3</br>' +
                '<small>IMDB <b>' + ratingImdb + '</b></small></br>' +
                '<small>Rotten Tomatoes <b>' + ratingRT + '</b></small></br>' +
                '<small>Metacritics <b>' + ratingMC + '</b></small></br>' +
                '<small>' + respuestaId.Plot + '</small>',
                'info',
            )
        }
    })
};


function guardarRatingsPelicula(id) {
    // Busco input de busqueda y armo el API con key y peli
    let codigoIMDB = id;
    console.log(codigoIMDB);
    const APIKEY = "b1441511";
    const APIBUSQUEDA = "http://www.omdbapi.com/?r=json&plot=full";
    apiconid = APIBUSQUEDA + "&apikey=" + APIKEY + "&i=" + codigoIMDB;
    console.log(apiconid);

    // Hago consulta con AJAX a traves de ID que brinda más información puntual
    $.ajax({
        method: "GET",
        url: apiconid,
        success: function (respuestaId) {
            console.log(respuestaId);
            largoRatings = respuestaId.Ratings.length;
            console.log(largoRatings);

            // En funcion a la respuesta NORMALIZO (de 0 a 100) y ORGANIZO las notas ya que no siempre viene Array completo
            //Inicializo Variables
            let ratingImdb = 0;
            let ratingRT = 0;
            let ratingMC = 0;
            let avgRanking = 0;

            for (var i = 0; i < largoRatings; i++) {
                switch (respuestaId.Ratings[i].Source) {
                    case 'Internet Movie Database':
                        // IMDB viene como X/10
                        ratingImdb = parseFloat(respuestaId.Ratings[i].Value) * 10;
                        break;
                    case 'Rotten Tomatoes':
                        // RT viene como X%
                        ratingRT = parseFloat(respuestaId.Ratings[i].Value);
                        break;
                    case 'Metacritic':
                        // MC viene como X/100
                        ratingMC = parseFloat(respuestaId.Ratings[i].Value);

                        break;
                }
            };

            // Verifico normalización correcta de los ratings y creo un Promedio
            console.log(ratingImdb);
            console.log(ratingRT);
            console.log(ratingMC);

            avgRanking = ((ratingImdb + ratingRT + ratingMC) / largoRatings).toFixed(1);
            console.log(avgRanking);

            //Creo el resto de los campos que quiero guardar como fecha de Carga y renombro aquellos para que sea mas prolijo
            let id = respuestaId.imdbID;
            let fechaCarga = new Date();
            let nombre = respuestaId.Title;
            let tipo = respuestaId.Type;
            let anio = respuestaId.Year;
            let actores = respuestaId.Actors;
            let director = respuestaId.Director;

            // Creo el Objeto Pelicula con los datos ingresados
            const pelicula = new PeliculaGuardar(id, nombre, tipo, anio, actores, director, ratingImdb, ratingRT, ratingMC, fechaCarga);
            console.log(pelicula);
            // Cargo el Objeto creado en un array de pelicula llamado peliculas
            let peliculas = [];
            peliculas.push(pelicula);

            // Verifico si la Clave de peliculas ya está en el Storage. 
            // Si no existe el key, guardo el array como está
            // Si existe el key, primero me traigo la lista del Storage y concateno el array para no perder lo guardado
            if (!existeEnStorage(CLAVE)) {
                guardarEnStorage(CLAVE, peliculas);

            } else {
                let listaEnStorage = [];
                listaEnStorage = obtenerDatosDeStorage(CLAVE);
                listaEnStorage = listaEnStorage.concat(peliculas);
                guardarEnStorage(CLAVE, listaEnStorage);
            }

            // Genero MODAL con Sweet Alter Avisar que se guardó OK
            Swal.fire(

                {
                    position: 'center',
                    icon: 'success',
                    imageUrl: respuestaId.Poster,
                    imageWidth: 85,
                    imageHeight: 120,
                    imageAlt: 'Pelicula Guardada Image',
                    html: '<small>Se guardó en LocalStorage la película </small><b>' + nombre + '</b>',
                    showConfirmButton: false,
                    timer: 4000
                }
            );
        }
    })
}
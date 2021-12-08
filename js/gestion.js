const CLAVECONSULTA = "key_peliculasconsultadas";


let consultasEnStorage = obtenerDatosDeStorage(CLAVECONSULTA);
console.log(consultasEnStorage);
let cantidadPelisStorage = consultasEnStorage.length;
console.log(cantidadPelisStorage);
$("#cantidadStorage").append(`<h1 class="text-danger">${cantidadPelisStorage}</h1>`);

$("#btn_consultarstorage").on('click', function (event) {
    event.preventDefault();
    $("#guardadoEnStorage").empty();

    if (cantidadPelisStorage == "0") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Arriba dice que no hay pelis en el Storage... Asi que no hay nada que ver!',
        });
    } else {

        // En funcion a la respuesta, me quedo con el array Search que es donde esta el listo y lo muestro en una lista abajo
        for (const item of consultasEnStorage) {
            console.log(item);
            let posicion = consultasEnStorage.indexOf(item);
            console.log(posicion);
            $("#mainPeliculasEnStorage").slideUp(2000);

            $("#guardadoEnStorage").append(`<div class="row border-bottom align-items-center" id="lista${posicion}">
                                <h4 class="text-center col-3 col-md-4">${item.nombre}</h4>
                                <h5 class="text-center col-1 col-md-1">Rating: ${item.ratingImdb}</h5>
                                <h6 class="text-center col-2 col-md-3">Fecha Guardado: ${item.fechaCarga}</h6>
                                <button class="text-center btn btn-success col-3 col-md-2" id="btn_verinfo${posicion}">VerInfo</button>
                                <button class="text-center btn btn-danger col-3 col-md-2" id="btn_borrar${posicion}">Borrar</button>
                                </div>`);
            
            // Genero una accion para cada boton 
            $(`#btn_verinfo${posicion}`).on('click', function () {
                console.log(consultasEnStorage[posicion]);
                            // Genero MODAL con Sweet Alter para mirar las NOTAS!
            Swal.fire(
                consultasEnStorage[posicion].nombre + '</br>' +
                '<small>Calificacion Avg <b>' + consultasEnStorage[posicion].ratingImdb + '</b></br>' +
                 consultasEnStorage[posicion].Plot + '</small>',
            )
            });

            $(`#btn_borrar${posicion}`).on('click', function () {
                consultasEnStorage.splice(posicion,1);
                console.log(consultasEnStorage.length);
                guardarEnStorage(CLAVECONSULTA,consultasEnStorage);
                $(`#lista${posicion}`).empty();
                cantidadPelisStorage = consultasEnStorage.length;
            });
        };
        $("#guardadoEnStorage").append(`<div>
                <button class="btn btn-primary contacto__botoncolor"><a href="gestion.html">Volver</a></button></div>`);
    };
});
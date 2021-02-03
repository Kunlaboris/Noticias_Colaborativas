'use strict';

// se ata a cada controlador, si hay algo mal definido en el error, se modifica solo aqui. 
// no hay que pasar por cada controlador para modificar
// es el mismo codigo que se meteria en el catch de error de cada controlador


function createJsonError (err, res) {
    console.log(err);
    if(err.name === 'ValidationError') {
        err.status = 400;
    }

    res.status(err.status || 500);
    console.log('err.message', err.message);
    res.send({error: err.message});
}

module.exports = createJsonError;


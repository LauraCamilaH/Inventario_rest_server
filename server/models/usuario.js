const pg = require('pg-promise')

let Schema = pg.Schema;

let usuarioSchema = new pg.Schema ({
    nombreUsuario: {
        type: String,
        required: [true, 'el nombre ess necesario']
    },

    correo: {
        type: String,
        required: [true, 'el correo es necesario']
    },

    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria']
    },

})

module.exports = pg.model('usuario', usuarioSchema)
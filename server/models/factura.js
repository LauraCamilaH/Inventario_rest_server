const pg = require('pg-promise')

let Schema = pg.Schema;

let facturaSchema = new pg.Schema ({
    numeroFactura: {
        type: interger,
        required: [true, 'el nombre ess necesario']
    },

    conceptoFactura: {
        type: String,
        required: [true, 'el correo es necesario']
    },

    totalFactura: {
        type: interger,
        required: [true, 'la contraseña es obligatoria']
    },

    fechaCreacion: {
        type: String,
        required: [true, 'la contraseña es obligatoria']
    },

})

module.exports = pg.model('factura', facturaSchema)

const express = require('express') // utilizamos express peticiones http GET, POST DELETE
const app = express() // crea un objecto del modulo express
const bodyParser = require('body-parser') // se hace parse del body para pasarlo a JSON si no queda como un texto plano



//app.use(bodyParser.urlencoded({ extended: false })) // analiza objecto JSON, haciendo parse desde la url
app.use(bodyParser.json()) //middleware funciones que se disparan cada vez que pasa por estas lineas 

const { router } = require('./routes/autenticacion') // hacemos uso del archivo de autenticacion 

const config = require('./config/config') // como es el primer archivo configura las variables de entorno que requiere mi aplicaion




app.use(require('./routes/factura'))//middleware
app.use(router)


app.listen(process.env.PORT,
    () => {
        console.log(`escuchando en el puerto ${process.env.PORT}`)
    })


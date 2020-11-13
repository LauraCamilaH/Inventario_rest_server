const config = require('./config/config') // como es el primer archivo configura las variables de entorno que requiere mi aplicaion

const express = require('express')
const app = express()
const bodyParser = require('body-parser') // se hace parse del body para pasarlo a JSON si no queda como un texto plano
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json()) //middleware funciones que se disparan cada vez que pasa por estas lineas 



app.get('/productos', (req, res) => {
    res.json('Hello World')
})

app.get('/producto/:id', (req, res) => {

    const { id } = req.params // se puede hacer destructuring por si necesitamos mas query paramets



    res.json('Hola producto')
})

// se requiere  body-parser 
app.post('/producto', (req, res) => { // nuevos registros enviamos informacion 
    let body = req.body;// aparece cuando el body parse proceso cualquier payload ( la data o la carga que llevo cuanaod se realiza la peticion )
    if (body.nombreProducto === undefined || body.precio == undefined || fechaVencimiento ===undefined) {
        res.status(400).json ({
            ok: false,
            mensaje: 'el nombre del producto, precio, fecha de vencimiento son necesarios'
        })
    } else {
        res.json({

            producto: body
        })

    }
})

app.delete('/producto/:id', (req, res) => { // eliminar registro se utiliza el cambio de registro
    let id = req.params.id;

    res.json('delete roducto')
})

app.put('/producto/:id', (req, res) => { // actualizar registros
    let id = req.params.id;



    res.json({
        id

    }) // retorna el id que se le paso
})

app.listen(process.env.PORT,
     () => {
    console.log(`escuchando en el puerto 3000`)
})
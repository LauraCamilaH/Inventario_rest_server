const express = require('express')
const db = require('../posgres') // concecion bd 
const app = express() // creamos el objecto del modulo express
const { autenticacionMiddleware } = require('./autenticacion') // utilizamos el middleware para hacer la autenticacion

const { trazabilidad } = require('./autenticacion')
const { insertarTrazabilidad } = require('./trazabilidad')

const listar = async (req, res) => {
    const data = await db.any('SELECT * FROM factura')
    res.json(data)
}

const consultarFactura = async (req, res) => {
    const { id } = req.params
    const data = await db.one('SELECT * FROM factura where "idFactura" = $1', [id])
    // console.log(data)
    // res.json(data)
    await insertarTrazabilidad(id, req.user.idUser, "consultando factura")
    if (data == 0) res.json({ menssage: 'No se encuentra el registro' }, 404)
    else res.json({ status: 'encontrado', message: 'Factura encontrada', data })
}

const insertar = async (req, res) => {
    const data = req.body
    console.log(data)

    const resultado = await db.one('INSERT INTO factura ("numeroFactura", "conceptoFactura", "totalFactura", "fechaCreacion") ' +
        'VALUES(${numeroFactura}, ${conceptoFactura}, ${totalFactura}, ${fechaCreacion}) RETURNING "idFactura"', data)
    console.log(req.user)
    await insertarTrazabilidad(resultado.idFactura, req.user.idUser, "ingresando factura")
    // VALUES(${name.first}, $<name.last>, $/age/)', {
    //     name: {first: 'John', last: 'Dow'},
    //     age: 30
    console.log(resultado)
    res.json(resultado)
}

const eliminar = async (req, res) => {
    // use of value transformation
    // deleting rows and returning the number of rows deleted


    const { id } = req.params // se puede hacer destructuring por si necitamos mas query paramets
    // insertarTrazabilidad (id, req.user.idUsuario, evento )
    const resul = await db.result('DELETE FROM factura WHERE "idFactura" = ${idFactura}', { idFactura: id }, r => r.rowCount)
    await insertarTrazabilidad(id, req.user.idUser, "eliminando factura")
    console.log(resul)
    //res.json(resul)
    res.status(201).json({ resul: `factura eliminada id: ${id}` })
}

const modificar = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const result = await db.result('update factura set "numeroFactura"=$1, "conceptoFactura"=$2, "totalFactura"=$3, "fechaCreacion"=$4' +
        ' where "idFactura"=$5', [req.body.numeroFactura, req.body.conceptoFactura, req.body.totalFactura, req.body.fechaCreacion, id]
        , r => r.rowCount)
    if (result == 0) { 
        res.json({ mensaje: 'No se encuentra el registro' }, 404) 
    }
    else {
        await insertarTrazabilidad(id, req.user.idUser, "modificar factura")
        res.json({ status: 'actualizado', message: 'Updated factura', data })
    }
}

app.get('/facturas', autenticacionMiddleware, async (req, res) => {
    try {
        console.log(`El usuario ${req.user.nombreUsuario} está consultando las facturas`)
        await listar(req, res)
        await insertarTrazabilidad(null, req.user.idUser, "consultando facturas")
    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: e.menssage })
    }
})

app.get('/factura/:id', autenticacionMiddleware, async (req, res) => {
    try {
        await consultarFactura(req, res)

    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: e.menssage })
    }
})

// se requiere  body-parser 
app.post('/factura', autenticacionMiddleware, async (req, res) => { // nuevos registros enviamos informacion 
    //let body = req.body;// aparece cuando el body parse proceso cualquier payload ( la data o la carga que llevo cuanaod se realiza la peticion )
    console.log(req.user)
    try {
        await insertar(req, res)
    } catch (e) {
        console.log(e)
        res.json({ mensaje: e.message }, 500)

    }

})

app.delete('/factura/:id', autenticacionMiddleware, async (req, res) => { // eliminar registro se utiliza el cambio de registro

    try {
        await eliminar(req, res)
        res.json({ mensaje: 'registro eliminado' }, 200)
    } catch (e) {
        console.log(e)
        res.status(200).json({ mensaje: e.mensaje })
    }
})

app.put('/factura/:id', autenticacionMiddleware, async (req, res) => { // actualizar registros

    try {
        await modificar(req, res)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: error.mensaje })
    }
})

module.exports = app

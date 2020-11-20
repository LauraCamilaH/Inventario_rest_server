const express = require('express')
const app = express() // creamos el objecto del modulo express
const router = require("express").Router();

const db = require('../posgres') // conexion bd 

const insertarTrazabilidad = async ( idfactura, idusuario, evento) => {
    const fechaevento =  new Date();
    
    const sql = 'INSERT INTO trazabilidad (idfactura, idusuario, "evento", "fechaevento") ' +
    'VALUES( ${idfactura}, ${idusuario}, ${evento}, ${fechaevento})'

    console.log(sql)
    await db.none(sql, {idfactura, idusuario, evento, fechaevento})
   
}

const consultarTrazabilidad = async (req, res) => {
    const data = await db.any('SELECT * FROM  trazabilidad')
    console.log(data)
    res.json(data)
}



// app.post('/trazabilidad',  async (req, res) => { // nuevos registros enviamos informacion 
//     //let body = req.body;// aparece cuando el body parse proceso cualquier payload ( la data o la carga que llevo cuanaod se realiza la peticion )
//     try {
//         await insertarTrazabilidad(req, res)
//     } catch (e) {
//         console.log(e)
//         res.json({ mensaje: e.message }, 500)
        
//     }
    
// })

//console.log(`El usuario ${req.user.nombreUsuario} está consultando las facturas`)

app.get('/trazabilidad',  async (req, res) => {
    try {
        await consultarTrazabilidad(req, res)
     
    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: e.menssage })
    }
})








//------------------------------

// const consultarTraza = async (req, res) => {
//     const { id } = req.params
//     const data = await db.one('SELECT * FROM factura where "idFactura" = $1', [id])
//     // console.log(data)
//     // res.json(data)
//     if (data == 0) res.json({ menssage: 'No se encuentra el registro' }, 404)
//     else res.json({ status: 'encontrado', message: 'Factura encontrada', data })
// }
// app.get('/trazabilidad/:id',autenticacionMiddleware,  async (req, res) => {
//     try {
//         await consultarFactura(req, res)

//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ mensaje: e.menssage })
//     }
// })

module.exports = {
    app,
    insertarTrazabilidad
}
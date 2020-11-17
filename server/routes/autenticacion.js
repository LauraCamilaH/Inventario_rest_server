const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pn = require('../posgres');

async function hashPassword(password) {
    const passwordHash = await bcrypt.hash(password, process.env.PASSWORD_SALT);
    return passwordHash
}

router.post("/registro", async (req, res) => {
    try {

        let { nombreUsuario, correo, password, passwordCheck } = req.body;

        if (!nombreUsuario || !correo || !password || !passwordCheck)
            return res.status(400).json({ mensaje: "No ha ingresado todos los campos necesarios." });
        if (password.length < 5)
            return res.json({ msg: "La contraseña debe tener al menos 5 caracteres." }, 400);
        if (password !== passwordCheck)
            return res.json({ msg: "Ingrese la misma contraseña dos veces para verificación." }, 400);

        const passwordHash = await hashPassword(password)

        const newUser = { nombreUsuario, correo, password: passwordHash };
        console.log(newUser);

        const response = await pn.query('INSERT INTO usuarios ("nombreUsuario", correo, password) VALUES ($1, $2, $3)',
            [nombreUsuario, correo, passwordHash]);
        console.log(response);
        res.json(newUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password)
            return res.status(400).json({ msg: "No ha ingresado todos los campos necesarios." });

        const dbUser = await pn.one(`SELECT * FROM usuarios WHERE correo = $1`, [correo]);
        console.log(dbUser);

        const hashLogin = await hashPassword(password)
        console.log(hashLogin)

        const isMatch = hashLogin === dbUser.password;

        if (!isMatch) return res.json({ mensaje: "Credenciales inválidas" }, 400);
        //console.log(process.env.JWT_SECRET);
        const token = jwt.sign({ nombreUsuario: dbUser.nombreUsuario, correo: dbUser.correo },
            process.env.JWT_SECRET);// firma el token genera_

        res.json({ token });//Se retorna Objeto usuario
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

const autenticacionMiddleware = async (req, res, next) => {
    const header = req.headers['authorization'] //Authorization : Bearer <token>
    if (typeof header === 'undefined') {
        console.log(`No se encontró el header de autenticación`)
        return res.sendStatus(403); // codigo no permitido
    }
    // console.log(`Header de autenticación -> ${header}`)
    const bearer = header.split(" "); // partidos en dos los headers
    const bearerToken = bearer[1]; // y cogemos la ultima parte
    req.token = bearerToken; // la que guardamos en la variable
    try {
        await jwt.verify(req.token, process.env.JWT_SECRET)
    } catch (e) {
        console.log(`Error de verificación de token ${e.message}`)
        return res.sendStatus(403)
    }
    const usuario = jwt.decode(bearerToken)
    req.user = usuario
    next();
}

/** 
app.get('/protected', autenticacionMiddleware, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                text: 'protegido'
            })

        }
    })

})
*/


module.exports = { router, autenticacionMiddleware };


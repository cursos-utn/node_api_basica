const app = require('express')()
const util = require('util');
var body_parser = require("body-parser");
app.use(body_parser.json());

const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'curso_node'
});

conexion.query = util.promisify(conexion.query);

conexion.connect();

app.get('/', (req, res) => {
    res.send('ok')
})

// /api/contactos

// GET /api/contactos => listado de contactos
app.get('/api/contactos', async (req, res) => {
    try {
        const resultados = await conexion.query('select * from contacto');
        const respuesta = {
            status: 'ok',
            items: resultados
        }
        res.json(respuesta)
    } catch (e) {
        const respuesta = {
            status: 'error',
            error: e
        }
        res.status(500).json(respuesta)
    }
})

// GET /api/contactos/3 => Contacto con id 3
app.get('/api/contactos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await conexion.query('select * from contacto where id=?', [id]);
        if (resultado.length == 0) {
            const respuesta = {
                status: 'error',
                mensaje: 'Not found'
            }
            res.status(404).json(respuesta);
        }
        const respuesta = {
            status: 'ok',
            item: resultado
        }
        res.json(respuesta)
    } catch (e) {
        const respuesta = {
            status: 'error',
            error: e
        }
        res.status(500).json(respuesta)
    }
})


// POST /api/contactos => Agregar un contacto
app.post('/api/contactos', async (req, res) => {
    const contactoNuevo = req.body;
    const rtaQuery = await conexion.query('insert into contacto (nombre, apellido, telefono) values (?,?,?)', [contactoNuevo.nombre, contactoNuevo.apellido, contactoNuevo.telefono]);
    contactoNuevo.id = rtaQuery.insertId;

    const respuesta = {
        status: 'ok',
        item: contactoNuevo
    }
    res.status(200).json(respuesta)
})

// PUT /api/contactos/4 => Modificar un contacto con id 4
app.put('/api/contactos/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizacion = req.body;
    datosActualizacion.id = id;
    try {
        const rtaConsulta = await conexion.query('update contacto set nombre=?, apellido=?, telefono=? where id=?', [datosActualizacion.nombre, datosActualizacion.apellido, datosActualizacion.telefono, id]);
        if (rtaConsulta.affectedRows == 0) { // No cambio ninguna fila => no existia el id
            const respuesta = {
                status: 'error',
                mensaje: 'Not found'
            }
            res.status(404).json(respuesta);

        }
        const respuesta = {
            status: 'ok',
            item: datosActualizacion
        }
        res.json(respuesta)
    } catch (e) {
        const respuesta = {
            status: 'error',
            error: e
        }
        res.status(500).json(respuesta)
    }
})

// DELETE /api/contactos/8 => Borrar el contacto con id 8
app.delete('/api/contactos/:id', async (req, res) => {
    const id = req.params.id;
    try {

        const resultado = await conexion.query('delete from contacto where id=?', [id]);
        const respuesta = {
            status: 'ok',
        }
        if (resultado.affectedRows == 0) {
            const respuesta = {
                status: 'error',
                mensaje: 'Not found'
            }   
            res.status(404).json(respuesta);
        }
        res.json(respuesta)
    } catch (e) {
        const respuesta = {
            status: 'error',
            error: e
        }
        res.status(500).json(respuesta)
    }
})

app.listen(3000, () => {
    console.log('App escuchando en puerto 3000')
})
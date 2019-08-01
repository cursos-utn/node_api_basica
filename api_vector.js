const app = require('express')()
var body_parser = require("body-parser");
app.use(body_parser.json());



app.get('/', (req, res) => {
    res.send('ok')
})

var contactos = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '13123123123' },
    { id: 2, nombre: 'Pedro', apellido: 'Fonseca', telefono: '32233243' },
    { id: 3, nombre: 'Julian', apellido: 'Gutierrez', telefono: '44444' },
    { id: 4, nombre: 'MAria', apellido: 'Michango', telefono: '5555' }
]

// /api/contactos

// GET /api/contactos => listado de contactos
app.get('/api/contactos', async (req, res) => {
    const respuesta = {
        status: 'ok',
        items: contactos
    }
    res.status(200).json(respuesta);

})

// GET /api/contactos/3 => Contacto con id 3
app.get('/api/contactos/:id', (req, res) => {
    const id = req.params.id;
    if (id <= contactos.length) {
        const respuesta = {
            status: 'ok',
            item: contactos[id - 1]
        }
        res.status(200).json(respuesta)
    } else {
        const respuesta = {
            status: 'error',
            message: 'Not found'
        }
        res.status(404).json(respuesta);
    }
})


// POST /api/contactos => Agregar un contacto
app.post('/api/contactos', (req, res) => {
    const contactoNuevo = req.body;
    contactoNuevo.id = contactos.length + 1
    contactos.push(contactoNuevo)
    const respuesta = {
        status: 'ok',
        item: contactoNuevo
    }
    res.status(200).json(respuesta)
})

// PUT /api/contactos/4 => Modificar un contacto con id 4
app.put('/api/contactos/:id', (req, res) => {
    const id = req.params.id;
    if (id <= contactos.length) {
        const contactoAModificar = contactos[id - 1];
        contactoAModificar.nombre = req.body.nombre;
        contactoAModificar.apellido = req.body.apellido;
        contactoAModificar.telefono = req.body.telefono;
        contactos[id - 1] = contactoAModificar;
        const respuesta = {
            status: 'ok',
            item: contactoAModificar
        }
        res.status(200).json(respuesta)
    } else {
        const respuesta = {
            status: 'error',
            message: 'Not found'
        }
        res.status(404).json(respuesta);
    }
})

// DELETE /api/contactos/8 => Borrar el contacto con id 8
app.delete('/api/contactos/:id', (req, res) => {
    const id = req.params.id;
    if (id <= contactos.length) {
        contactos.splice(id - 1, 1);
        const respuesta = {
            status: 'ok'
        }
        res.status(200).json(respuesta);
    } else {
        const respuesta = {
            status: 'error',
            message: 'Not found'
        }
        res.status(404).json(respuesta);
    }
})

app.listen(3000, () => {
    console.log('App escuchando en puerto 3000')
})
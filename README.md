# API Básica

## Introducción

API básica para la administración de contactos. Los archivos ```api_vector.js``` y ```api_mysql.js``` son la misma API. El archivo ```api_vector.js``` maneja toda la información en un vector (por lo que al reiniciar el servidor se pierden todos los datos) El archivo ```api_mysql.js``` maneja la información en una base de datos MySQL (el script de creación de la base de datos, tabla e inserción de datos es ```script.sql```)

## Instalación

```
npm install
```

Para la versión en MySQL es necesario correr el script ```script.sql``` en un servidor MySQL, el cual creará

* Base de datos ```curso_node```
* Tabla ```contacto```
* 2 registros dentro de la tabla ```contacto```

## Correr la aplicación

Para correr la API que guarda la información en un vector
```
node api_vector.js
```

o

Para correr la API que guarda la información en MySQL
```
node api_mysql.js
```

## Prueba de la API

Todas las peticiones deben ser realizadas a ```http://localhost:3000/api/contactos``` permitiendo las siguientes operaciones.

### GET /api/contactos

Retorna el listado de contactos

### POST /api/contactos

Agrega un nuevo contacto
```
{
    "nombre": "<nombre>",
    "apellido": "<apellido>",
    "telefono": "<telefono>"
}
```

### GET /api/contactos/:id

Retorna el contacto con id :id

### PUT /api/contactos/:id

Actualiza el contacto con id :id

```
{
    "nombre": "<nombre>",
    "apellido": "<apellido>",
    "telefono": "<telefono>"
}
```

### DELETE /api/contactos/:id

Borrar el contacto con id :id
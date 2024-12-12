// Seleccionar o crear la base de datos
db = db.getSiblingDB("applibros"); // Cambia el nombre de la base de datos si lo necesitas

// Función para importar un archivo JSON a una colección
function importarDatos(coleccion, archivo) {
    const fs = require("fs");

    // Leer archivo JSON
    let datos = JSON.parse(fs.readFileSync(archivo));

    // Procesar los campos _id
    datos = datos.map(doc => {
        if (doc._id && doc._id.$oid) {
            doc._id = ObjectId(doc._id.$oid);
        }
        return doc;
    });

    // Eliminar la colección si ya existe
    db[coleccion].drop();

    // Insertar los datos en la colección
    db[coleccion].insertMany(datos);

    print(`Colección '${coleccion}' creada con éxito con los datos del archivo '${archivo}'.`);
}

// Importar datos de los archivos JSON
importarDatos("obras", "/docker-entrypoint-initdb.d/obras.json");
importarDatos("usuarios", "/docker-entrypoint-initdb.d/usuarios.json");
importarDatos("workspaces", "/docker-entrypoint-initdb.d/workspaces.json");

print("Base de datos y colecciones inicializadas con éxito.");
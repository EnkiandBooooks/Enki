import { MongoClient } from "mongodb";
import fs from "fs/promises";

const uri = "mongodb://localhost:27017";

const dbName = "applibros"; // Cambia por el nombre de tu base
const collectionName = "workspaces"; // Cambia por tu colección

// Función recursiva para convertir todos los _id (incluidos subdocumentos)
function procesarIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => procesarIds(item)); // Procesar arrays
  } else if (obj && typeof obj === "object") {
    for (const key in obj) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key);

      // Solo procesar si la propiedad es modificable
      if (descriptor?.writable || descriptor?.configurable) {
        if (key === "_id" && obj[key] && obj[key].toString) {
          obj[key] = obj[key].toString(); // Convertir ObjectId a string
        } else if (obj[key] && typeof obj[key] === "object") {
          obj[key] = procesarIds(obj[key]); // Procesar objetos anidados
        }
      }
    }
  }
  return obj;
}

// Función principal para exportar datos
async function exportarJSON() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Obtener todos los documentos de la colección
    const data = await collection.find({}).toArray();

    // Procesar todos los _id (incluyendo subdocumentos y arrays)
    const transformedData = data.map((doc) => procesarIds(doc));

    // Guardar el resultado en un archivo JSON
    await fs.writeFile("output_limpio.json", JSON.stringify(transformedData, null, 2));
    console.log("Datos exportados correctamente a output_limpio.json");
  } catch (err) {
    console.error("Error al exportar datos:", err);
  } finally {
    await client.close();
  }
}

// Ejecutar la exportación
exportarJSON();

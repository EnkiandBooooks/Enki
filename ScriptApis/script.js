const axios = require('axios');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const readline = require('readline');
require('dotenv').config()

const mongoUri = process.env.MONGO_URI;
const googleBooksApiKey = process.env.API_KEY_MAX;
const mongoClient = new MongoClient(mongoUri);

const abecedario = 'abcdefghijklmnopqrstuvwxyz';

/**
*A partir de una query se busca con la api de google libros con un máximo de resultados.
*Si la api funciona correctamente y hay resultados devuelve un json con los libros, estos se formatean en una lista objetos jsvascript con los datos que interesan.
*Si la api no funciona correctamente se devuelve null.
*/
async function recogerLibros(query,maxResultados) {
  
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResultados}&langRestrict=es&key=${googleBooksApiKey}`;
  const response = await axios.get(url);
  return response.data.items ? response.data.items.map(book => ({
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    publishedDate: book.volumeInfo.publishedDate,
    description: book.volumeInfo.description,
    pageCount: book.volumeInfo.pageCount,
    categories: book.volumeInfo.categories,
    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
  })) : null;
}

/**
* A partir de una lista de objetos de los libros se mueven a la colección obras de la base de datos applibros de mongodb.
* Se comprueba también antes de añadir un libro si ya existe en la base de dtos para evitar duplicidades
*/
async function moverLibroDB(books) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('applibros');
    const collection = database.collection('obras');
    
    console.log("--------------------------------------------------")
    for(book of books){
      let existe = await collection.countDocuments({title:book.title})
      if (existe < 1){
        await collection.insertOne(book);
        console.log("Libro",book.title,"insertado en la base de datos")
      }else{
        console.log("El libro con nombre",book.title,"ya existe en la base de datos")
      }
    }
  } catch(error){
    console.log(error);
  } 
  finally {
    console.log("--------------------------------------------------\n")
    await mongoClient.close();
  }
}

/**
* Se recorren cada una de las letras del abecedario y se pasan como query de la función de recogerLibros con 40 resultados.
* Si hay libros se añaden a la base de datos.
*/
async function anadirLibrosAleatorios(){
  for(letra of abecedario){
    console.log("Letra",letra,":");
    try {
      const book = await recogerLibros(letra,40);
      if (!book) {
        console.log('No se pudo encontrar un libro.');
      
      }else{
        await moverLibroDB(book);
      }
      
    } catch (error) {
      console.error(error);
      console.log('Ocurrió un error al insertar un libro.');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
}

/**
* Se recorren cada una de las líneas de un archivo de texto y se pasan como query de la función de recogerLibros con 1 resultado.
* Si hay libros se añaden a la base de datos.
*/
async function anadirLibrosDesdeArchivo(archivo) {
  try {
    const fileStream = fs.createReadStream(archivo);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      console.log(line);
      try {
        const book = await recogerLibros(line, 1);
        if (!book) {
          console.log("No se pudo encontrar un libro.");
        } else {
          await moverLibroDB(book);
        }
      } catch (error) {
        console.error(error);
        console.log("Ocurrió un error al insertar el libro.");
      }

      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } catch (error) {
    console.error("El archivo especificado no existe o está corrupto.");
  }
}

/*
*Se crean como argumentos en la ejecución --archivo [nombre archivo] y --aleatorio para elegir que modo usar del script
*/
async function main() {
  const args = process.argv.slice(2);
  const modo = args[0] || '--archivo';

  if (modo === '--aleatorio') {
    console.log('Añadiendo de forma aleatoria libros...');
    await anadirLibrosAleatorios();
  } else if (modo === '--archivo') {
    const nombreArchivo = args[1] || 'libros.txt';
    console.log(`Ejecutando modo archivo con el archivo: ${nombreArchivo}`);
    await anadirLibrosDesdeArchivo(nombreArchivo);
  } else {
    console.log('Modo no reconocido. Use "--aleatorio" o "--archivo [nombre de archivo]".');
  }
}

main().catch(console.error);





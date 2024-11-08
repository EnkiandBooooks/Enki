import { connectDB } from "../js/database/mongodb/connectBD.js";
import { bookModel } from "../js/schema/obras/obras.js";
import axios from "axios";
import fs from "fs";
import readline from "readline";
import { franc } from "franc";
import "dotenv/config";


const abecedario = 'abcdefghijklmnopqrstuvwxyz';

/**
*A partir de una query se busca con la api de google libros con un máximo de resultados.
*Si la api funciona correctamente y hay resultados devuelve un json con los libros, estos se formatean en una lista objetos jsvascript con los datos que interesan.
*Si la api no funciona correctamente se devuelve null.
*/
// async function recogerLibrosAPI(query,maxResultados) {
  
//   const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResultados}&orderBy=relevance&printType=books&filter=ebooks&projection=full&langRestrict=es&key=${process.env.API_KEY}`;
//   const response = await axios.get(url);
//   return response.data.items ? response.data.items.map(book => ({
//     title: book.volumeInfo.title,date
//     authors: book.volumeInfo.authors,
//     publishedDate: book.volumeInfo.publishedDate,
//     description: book.volumeInfo.description,
//     pageCount: book.volumeInfo.pageCount,
//     categories: book.volumeInfo.categories,
//     rating: book.volumeInfo.averageRating,
//     thumbnail: book.volumeInfo.imageLinks?.thumbnail,
//   })) : null;
// }
async function recogerLibrosAPI(query, maxResultados) {
  const url = `https://openlibrary.org/search.json?q=${query}&limit=${maxResultados}&language:en`;
  const response = await axios.get(url);

  return response.data.docs
  .filter(book => 
    book.title && 
    book.author_name &&
    Array.isArray(book.publish_date) && 
    book.publish_date.length > 0 &&
    Array.isArray(book.first_sentence)  &&
    enDescription(book.first_sentence) &&
    book.number_of_pages_median > 0 &&
    book.ratings_average &&
    Array.isArray(book.isbn) &&
    book.isbn.length > 0 &&
    Array.isArray(book.subject) &&
    book.subject.length > 0
  )
  .map(book => ({
      title: book.title,
      authors: book.author_name,
      publishedDate: book.publish_date[0],
      description: enDescription(book.first_sentence),
      pageCount: book.number_of_pages_median,
      categories: book.subject.slice(0, 3),
      rating: book.ratings_average,
      isbn: book.isbn[0],
      thumbnail: `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg`,
      largeThumbnail: `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`
  }));
};
function enDescription(sentences){
  const onlyLanguages = ['sco', 'ulst', 'eng'];

  const text = sentences.map(language => franc(language));
  const enIndex = text.findIndex(sentence => onlyLanguages.includes(sentence));
  return sentences[enIndex];
}
// if (Array.isArray(book.first_sentence)) {
//   englishSentence = book.first_sentence.find(sentence => franc(sentence) === 'eng') || "Sin descripción";
// } else if (typeof book.first_sentence === "string") {
//   // Si `first_sentence` es una cadena, se detecta directamente
//   englishSentence = franc(book.first_sentence) === 'eng' ? book.first_sentence : "Sin descripción";
// }
/**
* A partir de una lista de objetos de los libros se mueven a la colección obras de la base de datos applibros de mongodb.
* Se comprueba también antes de añadir un libro si ya existe en la base de dtos para evitar duplicidades
*/
async function moverLibroDB(books) {
  try {
    await connectDB();
    
    console.log("--------------------------------------------------")
    for(const book of books){
      let existe = await bookModel.findOne({isbn : book.isbn});
      
      if (!existe){
        await bookModel.create(book);
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
  }
}

/**
* Se recorren cada una de las letras del abecedario y se pasan como query de la función de recogerLibros con 40 resultados.
* Si hay libros se añaden a la base de datos.
*/
async function anadirLibrosAleatorios(){
  for(const letra of abecedario){
    console.log("Letra",letra,":");
    try {
      const book = await recogerLibrosAPI(letra,100);
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
        const book = await recogerLibrosAPI(line, 40);
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

async function anadirLibroManual(query){
    console.log(`Buscando libro con título ${query}`);
    try {
      const book = await recogerLibrosAPI(query,100);
      if (!book) {
        console.log('No se pudo encontrar un libro.');
      
      }else{
        await moverLibroDB(book);
      }
      
    } catch (error) {
      console.error(error);
      console.log('Ocurrió un error al insertar un libro.');
    }
}


/*
*Se crean como argumentos en la ejecución --archivo [nombre archivo], --aleatorio y --titulo [nombre obra] para elegir que modo usar del script
*/
async function main() {
  const args = process.argv.slice(2);
  const modo = args[0] || '--archivo';

  if (modo === '--aleatorio') {
    console.log('Añadiendo de forma aleatoria libros...');
    await anadirLibrosAleatorios();
  } else if (modo === '--archivo') {
    const nombreArchivo = args[1] || 'libros_traducidos.txt';
    console.log(`Ejecutando modo archivo con el archivo: ${nombreArchivo}`);
    await anadirLibrosDesdeArchivo(nombreArchivo);
  } else if (modo === '--titulo'){
    const nombreObra = args[1] || 'harry potter';
    await anadirLibroManual(nombreObra);
    
  }else{
    console.log('Modo no reconocido. Use "--aleatorio", "--titulo [título de obra]" o "--archivo [nombre de archivo]".');
  }
}

main().catch(console.error);





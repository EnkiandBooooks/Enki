const axios = require('axios');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const readline = require('readline');

const mongoUri = "mongodb://127.0.0.1:27017";
const googleBooksApiKey = "AIzaSyA_B8AAMitgYFuZJLShoMhRStccAePNpsM";
const mongoClient = new MongoClient(mongoUri);

const abecedario = 'abcdefghijklmnopqrstuvwxyz';

async function recogerLibros(query) {
  
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=es&key=${googleBooksApiKey}`;
  const response = await axios.get(url);
  const apiBooks = response.data.items ? response.data.items : null;
  let i = 0;
  let books = []
  
  for(book of apiBooks){
    books[i] = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      publishedDate: book.volumeInfo.publishedDate,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
      categories: book.volumeInfo.categories,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
    };
    i++;
  }

  return books;  
}

async function recogerUnLibro(query) {
  
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&langRestrict=es&key=${googleBooksApiKey}`;
  const response = await axios.get(url);
  const book = response.data.items ? response.data.items[0] : null;

  return book ?  [{
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      publishedDate: book.volumeInfo.publishedDate,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
      categories: book.volumeInfo.categories,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
  }] : null;
}


async function moverLibroDB(books) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('applibros');
    const collection = database.collection('obras');
    
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
    await mongoClient.close();
  }
}

async function anadirLibro(){
  for(letra of abecedario){
    console.log(letra);
    try {
      const book = await recogerLibros(letra);
      if (!book) {
        console.log('No se pudo encontrar un libro.');
      
      }else{
        await moverLibroDB(book);
      }
      
    } catch (error) {
      console.error(error);
      console.log('Ocurrió un error al insertar el libro.');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
}


async function anadirLibroArchivo() {
  const fileStream = fs.createReadStream('libros.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    console.log(line);
    try {
      const book = await recogerUnLibro(line);
      if (!book) {
        console.log('No se pudo encontrar un libro.');
      
      }else{
        await moverLibroDB(book);
      }
      
    } catch (error) {
      console.error(error);
      console.log('Ocurrió un error al insertar el libro.');
    }

    await new Promise(resolve => setTimeout(resolve, 5));
  }
}

anadirLibroArchivo();








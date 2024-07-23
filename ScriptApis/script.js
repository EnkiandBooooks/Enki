const axios = require('axios');
const { MongoClient } = require('mongodb');


const mongoUri = "mongodb://127.0.0.1:27017";
const googleBooksApiKey = "AIzaSyA_B8AAMitgYFuZJLShoMhRStccAePNpsM";
const mongoClient = new MongoClient(mongoUri);

const searchTerms = ['fiction', 'nonfiction', 'mystery', 'fantasy', 'history', 'science', 'romance', 'adventure'];

function getRandomSearchTerm() {
  return searchTerms[Math.floor(Math.random() * searchTerms.length)];
}

async function fetchRandomBook() {
  const randomTerm = getRandomSearchTerm();
  const url = `https://www.googleapis.com/books/v1/volumes?q=${randomTerm}&maxResults=1&key=${googleBooksApiKey}`;
  const response = await axios.get(url);
  const book = response.data.items ? response.data.items[0] : null;
  return book ? {
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    publishedDate: book.volumeInfo.publishedDate,
    description: book.volumeInfo.description,
    pageCount: book.volumeInfo.pageCount,
    categories: book.volumeInfo.categories,
    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
  } : null;
}



async function insertBookIntoDb(book) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('applibros');
    const collection = database.collection('obras');
    await collection.insertOne(book);
  } catch(error){
    console.log(error);
  } 
  finally {
    await mongoClient.close();
  }
}

async function anadirLibro(){
  try {
    const book = await fetchRandomBook();
    if (!book) {
      console.log('No se pudo encontrar un libro.');
      return;
    }
    await insertBookIntoDb(book);
    
    console.log('Libro aleatorio insertado en la colección obras.');
  } catch (error) {
    console.error(error);
    console.log('Ocurrió un error al insertar el libro.');
  }
}

anadirLibro();
  








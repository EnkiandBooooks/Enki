const axios = require('axios');
const { MongoClient } = require('mongodb');


const mongoUri = "mongodb://127.0.0.1:27017";
const googleBooksApiKey = "AIzaSyA_B8AAMitgYFuZJLShoMhRStccAePNpsM";
const mongoClient = new MongoClient(mongoUri);

const searchTerms = ['fiction', 'nonfiction', 'mystery', 'fantasy', 'history', 'science', 'romance', 'adventure'];

function recogerQuery() {
  return searchTerms[Math.floor(Math.random() * searchTerms.length)];
}

async function recogerLibros() {
  const randomTerm = "a";
  const url = `https://www.googleapis.com/books/v1/volumes?q=${randomTerm}&maxResults=5&key=${googleBooksApiKey}`;
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
  console.log(books)
  return books;  
}



async function moverLibroDB(books) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('applibros');
    const collection = database.collection('obras');
    await collection.insertMany(books);
  } catch(error){
    console.log(error);
  } 
  finally {
    await mongoClient.close();
  }
}

async function anadirLibro(){
  try {
    const book = await recogerLibros();
    if (!book) {
      console.log('No se pudo encontrar un libro.');
    
    }else{
      await moverLibroDB(book);
      console.log('Libro aleatorio insertado en la colección obras.');
    }
    
  } catch (error) {
    console.error(error);
    console.log('Ocurrió un error al insertar el libro.');
  }
}

anadirLibro();
  








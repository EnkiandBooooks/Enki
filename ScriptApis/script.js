const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;

const mongoUri = "mongodb://localhost:27017";
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
  } finally {
    await mongoClient.close();
  }
}

app.get('/add-random-book', async (req, res) => {
  try {
    const book = await fetchRandomBook();
    if (!book) {
      return res.status(404).send('No se pudo encontrar un libro.');
    }
    await insertBookIntoDb(book);
    res.send('Libro aleatorio insertado en la colección obras.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al insertar el libro.');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

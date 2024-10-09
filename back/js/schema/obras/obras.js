import mongoose from 'mongoose';
const mongooseSchema = mongoose.Schema;
/**
 * Esquema de Mongoose para la colección de libros (obra).
 * Para consultar libros que tengan un genero: { categories: { $regex: ".*fiction.*", $options: "i" }}
 */ 
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [{ type: String }],
    publishedDate: { type: String },
    description: { type: String },
    pageCount: { type: Number },
    categories: [{ type: String }],
    rating: {type: Number},
    isbn: { type: String },
    thumbnail: { type: String },
    largeThumbnail: { type: String},
}, { versionKey: false });

/**
 * Modelo de Mongoose para la colección `obra`.
 * 
 * Este modelo representa libros y utiliza el esquema `bookSchema`.
 */

const bookModel = mongoose.model('obra', bookSchema);
export { bookModel };

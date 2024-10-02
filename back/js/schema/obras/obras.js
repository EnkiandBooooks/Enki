import mongoose from 'mongoose';
const mongooseSchema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [{ type: String }],
    publishedDate: { type: String },
    description: { type: String },
    pageCount: { type: Number },
    categories: [{ type: String }],
    rating: {type: Number},
    thumbnail: { type: String },
}, { versionKey: false });

const bookModel = mongoose.model('obra', bookSchema);
export { bookModel };

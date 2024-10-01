import mongoose from 'mongoose';

export class BooksModel {
  // Método para obtener múltiples obras
  static async getBooks(query) {
    try {
      const db = mongoose.connection.db;
      const obrasCollection = db.collection('obras');
      
      const obras = await obrasCollection.find(query).toArray();
      return obras;
    } catch (error) {
      console.error('Error al obtener las obras:', error);
      throw error;
    }
  }

  // Método para buscar una obra por algún campo
  static async searchById(query) {
    try {
      const db = mongoose.connection.db;
      const obrasCollection = db.collection('obras');
      
      const obra = await obrasCollection.findOne(query);
      return obra;
    } catch (error) {
      console.error('Error al buscar la obra:', error);
      throw error;
    }
  }
}

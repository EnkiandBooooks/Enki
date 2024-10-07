import mongoose from 'mongoose';

/**
 * Modelo de libros (BooksModel) para gestionar operaciones de consulta en la colección 'obras'.
 * 
 * @class BooksModel
 */
export class BooksModel {
   /**
   * Obtiene múltiples obras de la colección 'obras' en la base de datos que coincidan con la consulta proporcionada.
   * 
   * @static
   * @async
   * @param {Object} query - Objeto de consulta para filtrar las obras.
   * @returns {Promise<Array<Object>>} - Retorna un array de objetos que representan las obras encontradas.
   * 
   * @example
   * // Ejemplo de uso para obtener obras
   * const obras = await BooksModel.getBooks({ title: 'Harry Potter' });
   */
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

  /**
   * Busca una obra en la colección 'obras' según la consulta proporcionada.
   * 
   * @static
   * @async
   * @param {Object} query - Objeto de consulta para buscar la obra (por ejemplo, por ID).
   * @returns {Promise<Object|null>} - Retorna el objeto de la obra encontrada o `null` si no se encuentra ninguna.
   * 
   * @example
   * // Ejemplo de uso para buscar una obra por ID
   * const obra = await BooksModel.searchById({ _id:'60c72b2f9e1d4f3a2c5a3a1d'});
   */
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

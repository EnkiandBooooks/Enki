import bcrypt from 'bcrypt';

/**
 * Clase para gestionar el hash y la verificación de contraseñas.
 * 
 * @class PasswdHashManager
 */
export class PasswdHashManager {
    /**
     * Genera un hash a partir de una contraseña en texto plano.
     * 
     * @param {string} passwdText - La contraseña en texto plano.
     * @returns {Promise<string|null>} - El hash generado o `null` en caso de error.
     */
    static async hashPassword(passwdText) {//Se crea un hash a partir de un texto
        try {
            const hash = await bcrypt.hash(passwdText, parseInt(process.env.SALT_ROUNDS));
            return hash;
        } catch (err) {
            
            return null;
        }
    }
     /**
     * Compara una contraseña en texto plano con un hash.
     * 
     * @param {string} passwdText - La contraseña en texto plano.
     * @param {string} hash - El hash con el que se compara.
     * @returns {Promise<boolean>} - `true` si coinciden, `false` si no o en caso de error.
     */
    static async compareHash(passwdText, hash) {//Se compara un texto con un hash
        try {
            const result = await bcrypt.compare(passwdText, hash);
            return result;
        } catch (err) {
            
            return false;
        }
    }
}



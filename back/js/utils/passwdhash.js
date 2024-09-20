import bcrypt from 'bcrypt';

export class PasswdHashManager {
    static async hashPassword(passwdText) {//Se crea un hash a partir de un texto
        try {
            const hash = await bcrypt.hash(passwdText, parseInt(process.env.SALT_ROUNDS));
            return hash;
        } catch (err) {
            
            return null;
        }
    }

    static async compareHash(passwdText, hash) {//Se compara un texto con un hash
        try {
            const result = await bcrypt.compare(passwdText, hash);
            return result;
        } catch (err) {
            
            return false;
        }
    }
}



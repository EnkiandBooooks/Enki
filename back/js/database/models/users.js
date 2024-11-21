import mongoose from 'mongoose';

const mongooseSchema = mongoose.Schema;

/**
 * Modelo de Mongoose para la colección `usuario`.
 * - Almacena información del usuario.
 * 
 * @type {mongoose.Model}
 */
const user = new mongooseSchema({
    username:{
        type: String,
        required: [true, 'Es necesario un nombre de usuario'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'El correo no es válido']
    },
    password:{
        type: String,
        required: true,
        minlength: [8, 'La contraseña debe contener al menos 8 caracteres']
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    img:{
        type: String,
        default: null
    },
    theme: {
        themeName: {
            type: String,
            default: 'default'
        }
    },
    icon: {
        iconName: {
            type: String,
            default: 'default'
        }
    },
    workSpaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workspace'
    }]
}, { timestamps: true });

const userModel = mongoose.model('usuario', user);
export {userModel};
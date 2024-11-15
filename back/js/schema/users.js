import { Schema, z } from 'zod';
import mongoose from 'mongoose';
const mongooseSchema = mongoose.Schema;
/**
 * Esquema de validación para el registro de usuario.
 * @type {z.ZodSchema}
 */
export const userSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    passwordUser: z.string().min(8, { message: "La contraseña debe contener al menos 8 caracteres" }),
    cookie: z.string().min(1, { message: "La cookie es requerida" })
});
/**
 * Esquema de validación para el registro de usuario.
 * @type {z.ZodSchema}
 */
export const updateUserSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    mail: z.string().min(1, { message: "El email es requerido" }).email("El email no está bien formado")
});
/**
 * Esquema de Mongoose para la colección de espacios de trabajo.
 * 
 * @typedef {Object} WorkSpace
 * @property {ObjectId} idWorkSpace - ID del espacio de trabajo.
 * @property {string} workSpaceName - Nombre del espacio de trabajo.
 * @property {ObjectId} bookId - ID del libro (puede ser nulo).
 * @property {Array<Object>} members - Miembros del espacio con ID, nombre y progreso.
 * @property {Array<Object>} timeline - Eventos con fecha, descripción y comentarios.
 */
const workSpaceSchema = new mongooseSchema({
    // _id: [{type: mongooseSchema.Types.ObjectId, ref: 'user'}],
    workSpaceName: {
        type: String,
        required: true
    },
    bookId: {
        type: mongooseSchema.Types.ObjectId,
        default: null
    },
    members: [{
        memberId: {
            type: mongooseSchema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        name: {
            type: String,
            required: true
        },
        progress: {
            percentage: {
                type: Number,
                default: 0,
                min: 0,
                max: 100
            }
        }
    }],
    stamps: {
        type: Number,
        default: 0
    },
    privacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'Public'
    },
    timeline: [{
        date: {
            type: Date,
            default: Date.now
        },
        event: {    
            type: String,
            default: 'Primer evento'
        },
        //commentbox parámetros
        comment: [{
            commentId: {
                type: mongooseSchema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId()
            },
            text: {
                type: String,
                required: true
            },
            user: {
                commentUserId: {
                    type: mongooseSchema.Types.ObjectId,
                    default: null
                },
                userName: {
                    type: String,
                    required: true
                }
            },
            date: {
                type: Date,
                default: Date.now
            }
        }]
    }]
});
const workspaceModel = mongoose.model('workspace', workSpaceSchema);
export {workspaceModel}

/**
 * Modelo de Mongoose para la colección `usuario`.
 * - Almacena información del usuario, incluyendo `workSpacesCreated` y `guestWorkSpaces`.
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
        default: 'usuario'
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



import { Schema, z } from 'zod';
import mongoose from 'mongoose';
const mongooseSchema = mongoose.Schema;

export const userSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    passwordUser: z.string().min(8, { message: "La contraseña debe contener al menos 8 caracteres" }),
    cookie: z.string().min(1, { message: "La cookie es requerida" })
});

export const updateUserSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    mail: z.string().min(1, { message: "El email es requerido" }).email("El email no está bien formado")
});

const workSpaceSchema = new mongooseSchema({
    idWorkSpace: {
        type: mongooseSchema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
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
    timeline: [{
        date: {
            type: Date,
            default: Date.now
        },
        event: {
            type: String,
            default: 'Primer evento'
        },
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
        default: 'usuario'
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
    workSpacesCreated: {
        type: [workSpaceSchema], //Se le inserta automaticamente el modelo de workspace aqui en caso de haber contenido
        default: undefined
    },
    guestWorkSpaces: { //Es un array de referencias
        type: [mongooseSchema.Types.ObjectId],
        default: undefined
    } 
}, { timestamps: true });
const userModel = mongoose.model('usuario', user);
export {userModel};



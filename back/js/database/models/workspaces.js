import mongoose from 'mongoose';

const mongooseSchema = mongoose.Schema;

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
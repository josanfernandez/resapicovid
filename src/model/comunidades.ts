import {Schema, model } from 'mongoose'
// Definimos el type o interfase en este caso

export interface Comunidad {
    id: number;
    nombre: string;
  }

// Definimos el Schema
const comunidadSchema = new Schema({
    id: {
        type: Number,
        unique: true  // useCreateIndex: true en la conexión para que se cree el índice único
    },
    nombre: String,
})

// La colección de la BD: vehiculos (Plural siempre)
export const Comunidades = model('comunidades', comunidadSchema)
import {Schema, model } from 'mongoose'
// Definimos el type o interfase en este caso

export interface Provincia {
    id: number;
    comunidad: number;
    nombre: String;
    habitantes:number;
  }

// Definimos el Schema
const provinciaSchema = new Schema({
    id: {
        type: Number,
        unique: true  // useCreateIndex: true en la conexión para que se cree el índice único
    },
    comunidad: Number,
    nombre: String,
    habitantes:Number,
})

// La colección de la BD: vehiculos (Plural siempre)
export const Provincias = model('provincias', provinciaSchema)
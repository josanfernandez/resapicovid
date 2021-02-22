import {Schema, model } from 'mongoose'
// Definimos el type o interfase en este caso

export interface Municipio {
    id: number;
    provincia: number;
    nombre: String;
    confirmados: number;
    recuperados: number;
    criticos: number;
    fallecidos: number;
  }

// Definimos el Schema
const municipioSchema = new Schema({
    id: {
        type: Number,
        unique: true  // useCreateIndex: true en la conexión para que se cree el índice único
    },
    provincia: Number,
    nombre: String,
    confirmados: Number,
    recuperados: Number,
    criticos: Number,
    fallecidos: Number,
})

// La colección de la BD: vehiculos (Plural siempre)
export const Municipios = model('municipios', municipioSchema)
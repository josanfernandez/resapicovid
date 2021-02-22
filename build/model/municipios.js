"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Municipios = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const municipioSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true // useCreateIndex: true en la conexión para que se cree el índice único
    },
    provincia: Number,
    nombre: String,
    confirmados: Number,
    recuperados: Number,
    criticos: Number,
    fallecidos: Number,
});
// La colección de la BD: vehiculos (Plural siempre)
exports.Municipios = mongoose_1.model('municipios', municipioSchema);

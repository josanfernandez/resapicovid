"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provincias = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const provinciaSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true // useCreateIndex: true en la conexión para que se cree el índice único
    },
    comunidad: Number,
    nombre: String,
    habitantes: Number,
});
// La colección de la BD: vehiculos (Plural siempre)
exports.Provincias = mongoose_1.model('provincias', provinciaSchema);

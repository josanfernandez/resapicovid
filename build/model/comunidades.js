"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comunidades = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const comunidadSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true // useCreateIndex: true en la conexión para que se cree el índice único
    },
    nombre: String,
});
// La colección de la BD: vehiculos (Plural siempre)
exports.Comunidades = mongoose_1.model('comunidades', comunidadSchema);

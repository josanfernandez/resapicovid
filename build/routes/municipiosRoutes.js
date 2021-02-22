"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.municipiosRoutes = void 0;
const express_1 = require("express");
const municipios_1 = require("../model/municipios");
const database_1 = require("../database/database");
class MunicipiosRoutes {
    constructor() {
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Observar la diferencia entre req.body (para POST) 
            // y req.params (para GET con los parámetros en la URL
            const { provincia, nombre, confirmados, recuperados, criticos, fallecidos } = req.body;
            yield database_1.db.conectarBD();
            // Localizar el último varlor del id y sumarle 1. 
            //findOne para que devuelva un docuemento y no un array con un solo documento
            // Habrá que ver cuando no haya ninguno pornerlo a 1.
            const query = (yield municipios_1.Municipios.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 }).limit(1));
            let newId;
            if (query == null) {
                newId = 0;
            }
            else {
                newId = query.id;
            }
            const dSchema = {
                id: newId + 1,
                provincia: provincia,
                nombre: nombre,
                confirmados: confirmados,
                recuperados: recuperados,
                criticos: criticos,
                fallecidos: fallecidos
            };
            const oSchema = new municipios_1.Municipios(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield municipios_1.Municipios.findOneAndDelete({ id: id })
                .then((doc) => {
                console.log(doc);
            });
            database_1.db.desconectarBD();
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                console.log('Haciendo el query');
                const query = yield municipios_1.Municipios.find();
                console.log('Después del query');
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield municipios_1.Municipios.findOne({ id: id })
                .then((docu) => {
                if (docu == null) {
                    console.log('El documento que desea modificar no existe');
                    res.json({ "Error": "No existe: " + id });
                }
                else {
                    console.log('Existe: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            database_1.db.desconectarBD();
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { provincia, nombre, confirmados, recuperados, criticos, fallecidos } = req.body;
            yield database_1.db.conectarBD();
            yield municipios_1.Municipios.findOneAndUpdate({ id: id }, {
                provincia: provincia,
                nombre: nombre,
                confirmados: confirmados,
                recuperados: recuperados,
                criticos: criticos,
                fallecidos: fallecidos
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El municipio que desea modificar no existe');
                    res.json({ "Error": "No existe: " + id });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.get);
        this._router.get('/:id', this.getId);
        this._router.delete('/:id', this.delete);
        this._router.post('/', this.post);
        this._router.put('/:id', this.put);
    }
}
const obj = new MunicipiosRoutes();
obj.misRutas();
exports.municipiosRoutes = obj.router;

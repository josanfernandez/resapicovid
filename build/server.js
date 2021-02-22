"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const comunidadRoutes_1 = require("./routes/comunidadRoutes");
const provinciaRoutes_1 = require("./routes/provinciaRoutes");
const municipiosRoutes_1 = require("./routes/municipiosRoutes");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 4200);
        this.app.use(express_1.default.json()); // para que nuestro servidor entienda
        this.app.use(cors_1.default()); // evitar el error CORS
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    routes() {
        this.app.use('/comunidades', comunidadRoutes_1.comunidadesRoutes);
        this.app.use('/provincias', provinciaRoutes_1.provinciasRoutes);
        this.app.use('/municipios', municipiosRoutes_1.municipiosRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port: ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();

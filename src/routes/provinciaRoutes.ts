import {Request, Response, Router } from 'express'
import { Provincias, Provincia } from '../model/provincias'
import { db } from '../database/database'
import { comunidadesRoutes } from './comunidadRoutes'

class ProvinciasRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private post = async (req: Request, res: Response) => {
        console.log(req.body)
        // Observar la diferencia entre req.body (para POST) 
        // y req.params (para GET con los parámetros en la URL
        const { comunidad,nombre, habitantes } = req.body

        await db.conectarBD()
        // Localizar el último varlor del id y sumarle 1. 
        //findOne para que devuelva un docuemento y no un array con un solo documento

        // Habrá que ver cuando no haya ninguno pornerlo a 1.
        const query: any = ( await Provincias.findOne({},{id:1,_id:0}).sort({id: -1}).limit(1) )
        let newId: number
        if (query == null){
            newId = 0
        }else{
            newId = query.id
        }
        
        const dSchema = {
            id: newId+1,// parseInt(id), Hay que obtener la id para que se comporte como mockapi por ahora fija
            comunidad:comunidad,
            nombre: nombre,
            habitantes:habitantes,
        }
        const oSchema = new Provincias(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    } 


    private delete = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Provincias.findOneAndDelete( { id: id })
        .then(
            (doc: any) => {
                console.log(doc)
            }) 
        db.desconectarBD()
    }

    private get = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            console.log('Haciendo el query')
            const query = await Provincias.find()
            console.log('Después del query')
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }

    private getId = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Provincias.findOne(
                { id: id }
            )
            .then( (docu: any) => {
                    if (docu == null){
                        console.log('El documento que desea modificar no existe')
                        res.json({"Error":"No existe: " + id})
                    } else {
                        console.log('Existe: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err: null) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) // concatenando con cadena muestra mensaje
        db.desconectarBD()
    }

    private put = async (req: Request, res: Response) => {
        const { id } = req.params
        const { comunidad,nombre, habitantes } = req.body
        await db.conectarBD()
        await Provincias.findOneAndUpdate(
                { id: id}, 
                {
                    comunidad:comunidad,
                    nombre: nombre,
                    habitantes:habitantes,
                },
                {
                    new: true,
                    runValidators: true // para que se ejecuten las validaciones del Schema
                }  
            )
            .then( (docu: any) => {
                    if (docu==null){
                        console.log('La provincia que desea modificar no existe')
                        res.json({"Error":"No existe: " + id})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err: any) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) // concatenando con cadena muestra mensaje
        db.desconectarBD()
    }
  
    misRutas(){
        this._router.get('/', this.get)
        this._router.get('/:id', this.getId)
        this._router.delete('/:id', this.delete)
        this._router.post('/', this.post)
        this._router.put('/:id', this.put)
    }
}

const obj = new ProvinciasRoutes()
obj.misRutas()
export const provinciasRoutes = obj.router
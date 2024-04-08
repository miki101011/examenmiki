const express = require('express');
const rutas = express.Router();
const examod = require('../models/exam');

rutas.get('/', async (req, res) =>{
    try {
        const vista = await examod.find();
        console.log(vista);
        res.json(vista);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevoproc = new examod({
        titulo: req.body.titulo,
        detalle: req.body.detalle,
        precio: req.body.precio
    });
    try {
        const guardarproc = await nuevoproc.save();
        res.status(201).json(guardarproc);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarTarea = await examod.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarTarea);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminaritem = await examod.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Item eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

//consultas avanzadas----------------------
//buscar por nombre item en especifico
rutas.get('/busc-nombre/:titulo', async (req, res) =>{
    try {
        console.log(req.params.titulo);
        const busqNombre = await examod.find({ titulo: req.params.titulo});
        res.json(busqNombre);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
//ordenar por precio 
rutas.get('/ordenar-precio', async (req, res) =>{
    try {
        const ordenPrecio = await examod.find().sort({precio: 1});
        res.json(ordenPrecio);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});


// - Listar todas las tareas con prioridad 5
rutas.get('/tarea-prioridad/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tareasPrioridad = await TareaModel.find({ prioridad: req.params.id});
        res.json(tareasPrioridad);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// - Ordenar las tareas por prioridad de forma ascendente
rutas.get('/ordenar-tarea', async (req, res) =>{
    try {
        const tareasASC = await TareaModel.find().sort({prioridad: 1});
        res.json(tareasASC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Consultar una tarea especifica por Id
rutas.get('/tarea/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tarea = await TareaModel.findById(req.params.id);
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Eliminar todas las tareas con una prioridad determinada
rutas.delete('/eliminar-prioridad/:prioridad', async (req, res) =>{
    try {
        console.log(req.params.prioridad);
        const prioridad = req.params.prioridad
        const eliminarTareas = await TareaModel.deleteMany({prioridad});
        res.json({mensaje: 'Tareas eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
// - Consultar la tarea mas reciente anadida a la base de datos
rutas.get('/tarea-reciente', async (req, res) =>{
    try {
        const tarea = await TareaModel.findOne().sort({_id: -1});
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

module.exports = rutas;

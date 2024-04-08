const mongoose = require('mongoose');

const proyesq = new mongoose.Schema({
    titulo : String,
    detalle : String,
    precio : Number
})

const exaModel = mongoose.model('Examen',proyesq,'examen');
module.exports = exaModel;
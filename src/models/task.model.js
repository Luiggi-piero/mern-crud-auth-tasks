import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // fecha en el cual se espera cumplir/terminar
    date: {
        type: Date,
        default: Date.now // es la fecha actual si no le paso nada
    },
    // cada tarea esta relacionada a un usuario
    user: {
        type: mongoose.Schema.Types.ObjectId, // es un id de mongodb
        ref: 'User', // Nombre del modelo al que esta relacionado (linea 34 de user.model.js)
        required: true
    }

}, {
    timestamps: true
});

export default mongoose.model('Task', taskSchema);
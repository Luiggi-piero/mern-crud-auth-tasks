import mongoose from "mongoose";

/**
 * trim: true      retira los espacios en blanco del inicio y final  -> '   dev   '  ->  'dev'
 */


// SCHEMA
// - sirve como un objeto que queremos validar
// - esto NO permite consultar a la bd
// - cuando guardes en bd tiene que lucer asi
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// MODELO
// - tiene metodos para interactuar con la bd
export default mongoose.model('User', userSchema)

// mongodb crea una colección de usuarios llamado users
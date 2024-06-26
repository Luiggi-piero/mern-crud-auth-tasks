import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {

        // verifica si existe un usuario con ese email
        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(['The email already exists'])

        const passwordHash = await bcryptjs.hash(password, 10)

        // crea un usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        // guarda el usuario en la bd
        const userSaved = await newUser.save();

        // crea el token
        const token = await createAccessToken({ id: userSaved._id })

        // establece el token en una cookie
        res.cookie('token', token, {
            httpOnly: false,
            secure: true, // Asegúrate de usar true en producción para HTTPS
            sameSite: 'none'  // la cookie se enviará con todas las solicitudes entre sitios
        })

        // devolver al cliente los datos del usuario
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({ email })

        if (!userFound) return res.status(400).json({ message: 'User not found' });

        // compara el dato(password del body) con el hash(forma encriptada de la bd)
        const isMatch = await bcryptjs.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' })

        // crea el token
        const token = await createAccessToken({ id: userFound._id })

        // establece el token en una cookie
        res.cookie('token', token, {
            httpOnly: false, // true: no permite el acceso de la cookie con js desde el cliente y solo por http
            secure: true, // Asegúrate de usar true en producción para HTTPS, true: la cookie solo se enviará a través de conexiones HTTPS.
            sameSite: 'none' // La cookie se enviará con todas las solicitudes entre sitios. Para que esto funcione, secure debe estar establecido en true
        })

        // devolver al cliente los datos del usuario
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: 'User not found' });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

/**
 * 
 * verifica si el token es  valido
 * Caso:
 * - cuando se recarga la web y se usa el token de la web para autenticar haciendo una peticion al back
 * - esta accion se realiza cuando la pagina carga por primera vez
 */
export const verifyToken = async (req, res) => {
    const { token } = req.cookies; // obtengo las cookies del navegador

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' })

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: 'Unauthorized' })

        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        })
    })
}
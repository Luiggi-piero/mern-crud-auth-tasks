import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies; // funciona por la libreria cookie-parser
    // NOTA: si prefieres el token puede venir tmb desde el body

    // Niega el acceso si NO hay token
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' })

    // verifica si el token es válido 
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        // - Guarda en la proiedad user de req(puede tener otro nombre) 
        // el resultado de la decodificacion(user)
        // - luego podemos acceder a esta propiedad desde auth.controller.js
        req.user = user;
        next()
    })
}
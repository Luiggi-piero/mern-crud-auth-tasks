import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        // crear jwt
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            // inicio parte - esta parte indica que es asincrona
            (err, token) => {
                if (err) reject(err);
                // res.json({ token }) // devuelve el token
                resolve(token)
            }
            // fin parte
        )
    })
}
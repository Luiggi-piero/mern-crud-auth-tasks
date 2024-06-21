import { z } from 'zod';

// esquema para validar el registro (tiene 3 propiedades)
export const registerSchema = z.object({
    username: z.string({  
        // es un string requerido y si no cumple se muestra
        // este mensaje
        required_error: 'Username is required'  
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        // verifica que sea un email valido
        // si no lo es muestra este mensaje
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        // verifica que tenga minino 6 caracteres
        // si no muestra este mensaje
        message: 'Password must be at least 6 characters'
    })
})


// para validar login (tiene 2 propiedades)
export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 charactes'
    })
})




/**
 * tambien se pueden indicar la cantidad max/min de caracteres
 * username: z.string({
        required_error: 'Username is required'
    }).max(10),
 */
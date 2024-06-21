import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        // const tasks = await Task.find();  // trae todas las tareas de todos lo usuarios

        // trae todas las tareas donde la propiedad user tenga el id del usuario autenticado
        const tasks = await Task.find({ user: req.user.id })
            .populate('user'); // agrega los datos de usuario que tiene referenciado la propiedad user

        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        // crea una nueva tarea, aún no lo guarda en la bd
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id // agrega el id del usuario
        })

        // guarda en la bd
        const savedTask = await newTask.save();

        // retorno al cliente
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export const getTask = async (req, res) => {
    try {
        // busca una tarea por id y agrega los datos de usuario en la propiedad user
        const task = await Task.findById(req.params.id).populate('user');
        if (!task) return res.status(404).json({ message: 'Task not found' })
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' })
    }
}

export const deleteTask = async (req, res) => {
    try {
        // si elimina algo devuelve la tarea eliminada
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' })
        return res.sendStatus(204); // todo estuvo bien, pero no hay nada que devolver
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' })
    }
}

export const updateTask = async (req, res) => {
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body);  // devuelve el dato viejo
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });  // devuelve el dato nuevo
        if (!task) return res.status(404).json({ message: 'Task not found' })
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: 'Task not found' })
    }
}
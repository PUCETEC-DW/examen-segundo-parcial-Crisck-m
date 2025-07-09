const taskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
};

const createTask = async (req, res) => {
    let { id, title, description, completed, priority } = req.body;
    if (completed === undefined) completed = false;
    if (!id || !title || !description || typeof priority !== 'number') {
        return res.status(400).json({ error: 'Datos incompletos o inválidos' });
    }
    if (priority < 1 || priority > 5) {
        return res.status(400).json({ error: 'La prioridad debe estar entre 1 y 5' });
    }
    try {
        const task = await taskModel.addTask({ id, title, description, completed, priority });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'El estado completed debe ser booleano' });
    }
    try {
        const task = await taskModel.updateTaskStatus(Number(id), completed);
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await taskModel.deleteTask(Number(id));
        res.status(200).send();
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const getSummary = async (req, res) => {
    const summary = await taskModel.getSummary();
    res.json(summary);
};

module.exports = {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    getSummary
};

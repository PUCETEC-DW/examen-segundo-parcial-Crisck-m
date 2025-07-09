
import express from 'express';
import {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    getSummary
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/summary', getSummary);

export default router;

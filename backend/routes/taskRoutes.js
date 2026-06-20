import express from 'express';
import {
    getTasks,
    getTaskStats,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/stats', getTaskStats);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;

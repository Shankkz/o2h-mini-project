import Task from '../models/Task.js';

// @desc    Get all tasks for user (with pagination, search, sort, filter)
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
    try {
        const { status, search, sort, page = 1, limit = 6 } = req.query;
        
        let query = { user_id: req.user.id };
        
        // Filter by status
        if (status) {
            query.status = status;
        }

        // Search by title or description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Sorting
        let sortOption = { createdAt: -1 }; // Default sort by newest
        if (sort === 'asc') sortOption = { createdAt: 1 };
        
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const tasks = await Task.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Task.countDocuments(query);

        res.json({
            tasks,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            totalTasks: total
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
export const getTaskStats = async (req, res) => {
    try {
        const total = await Task.countDocuments({ user_id: req.user.id });
        const pending = await Task.countDocuments({ user_id: req.user.id, status: 'Pending' });
        const inProgress = await Task.countDocuments({ user_id: req.user.id, status: 'In Progress' });
        const completed = await Task.countDocuments({ user_id: req.user.id, status: 'Completed' });

        res.json({
            total,
            pending,
            inProgress,
            completed
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        if (description.length < 20) {
            return res.status(400).json({ message: 'Description must be at least 20 characters' });
        }

        const task = new Task({
            user_id: req.user.id,
            title,
            description,
            status: status || 'Pending'
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user_id.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user_id.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();

        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

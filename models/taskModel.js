let tasks = [];

export const getAllTasks = () => Promise.resolve(tasks);

export const getTaskById = (id) => Promise.resolve(tasks.find(t => t.id === id));

export const addTask = (task) => {
    if (tasks.some(t => t.id === task.id)) {
        return Promise.reject(new Error('ID duplicado'));
    }
    tasks.push(task);
    return Promise.resolve(task);
};

export const updateTaskStatus = (id, completed) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return Promise.reject(new Error('Tarea no encontrada'));
    task.completed = completed;
    return Promise.resolve(task);
};

export const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return Promise.reject(new Error('Tarea no encontrada'));
    tasks.splice(index, 1);
    return Promise.resolve();
};

export const getSummary = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed);
    const averagePriority = pending.length ? (pending.reduce((sum, t) => sum + t.priority, 0) / pending.length) : 0;
    return Promise.resolve({ total, completed, averagePriority });
};

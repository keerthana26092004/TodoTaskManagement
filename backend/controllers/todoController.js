const Todo = require("../models/todoModel");

// Create
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({ title, description });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: "Failed to create todo" });
    }
};

// Read all
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json({ error: "Failed to fetch todos" });
    }
};

// Read one
const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
};

// Update
const updateTodo = async (req, res) => {
    try {
        const { title, description, isCompleted } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, isCompleted },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(400).json({ error: "Failed to update todo" });
    }
};

// Delete
const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete todo" });
    }
};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};

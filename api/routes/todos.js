const express = require("express");
const router = express.Router();
const todosController = require("../controller/todos");

// Get all todos
router.get("/", todosController.getAllTodos);

// Insert todo in database
router.post("/", todosController.addNewTodo);

// Get todo by todo id
router.get("/:todoId", todosController.getTodoById);

// update todo details by todo id
router.patch("/:todoId", todosController.updateTodoById);

// Delete todo by id
router.delete("/:todoId", todosController.deleteTodo);

module.exports = router;

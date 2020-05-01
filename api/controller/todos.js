const mongoose = require("mongoose");
const Todos = require("../model/todos");

// Get all todos
const getAllTodos = (req, res, next) => {
  Todos.find()
    .exec()
    .then((results) => {
      const totalRecord = results.length;

      if (totalRecord > 0) {
        res.status(200).json({
          TotalRecord: totalRecord,
          Todos: results.map((result) => {
            return {
              id: result._id,
              todoName: result.todosName,
              todoDescription: result.todosDescription,
              createdOn: result.createdOn,
              updatedOn: result.updatedOn,
            };
          }),
        });
      } else {
        res.status(404).json({ message: "No Record Found" });
      }
    })
    .catch((err) => {
      // if got any error
      res.status(500).json({
        error: err,
      });
    });
};

// Insert todo in database
const addNewTodo = (req, res, next) => {
  // Todo Data
  const todo = new Todos({
    _id: new mongoose.Types.ObjectId(),
    todosName: req.body.todosName,
    todosDescription: req.body.todosDescription,
    createdOn: new Date(),
  });

  todo
    .save()
    .then((results) => {
      // After successfully inserted
      res.status(201).json({
        message: "Todo inserted successfully",
        todoCreatedData: {
          id: results.id,
          todosName: results.todosName,
          todosDescription: results.todosDescription,
        },
      });
    })
    .catch((err) => {
      // if got any error
      res.status(500).json({
        error: err,
      });
    });
};

// Get todo by todo id
const getTodoById = (req, res, next) => {
  const todoId = req.params.todoId;

  Todos.findById(todoId)
    .select("id todosName todosDescription createdOn updatedOn")
    .exec()
    .then((result) => {
      res.status(200).json({
        todo: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Update todo data by todo id
const updateTodoById = (req, res, next) => {
  const todoId = req.params.todoId;

  updateTodosData = {};

  for (const todo of req.body) {
    updateTodosData[todo.propName] = todo.value;
  }

  Todos.update({ _id: todoId }, { $set: updateTodosData })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Todos details updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Delete todo by todo id
const deleteTodo = (req, res) => {
  const todoId = req.params.todoId;

  Todos.remove({ _id: todoId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Todo is deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  getAllTodos,
  addNewTodo,
  getTodoById,
  updateTodoById,
  deleteTodo,
};

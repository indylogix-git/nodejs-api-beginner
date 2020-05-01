const mongoose = require("mongoose");

// Create a schema for todos
const todosSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  todosName: {
    type: String,
    required: true,
  },
  todosDescription: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todos", todosSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: String,
    comments: [
      {
        sender: String,
        message: String,
      },
    ],
    type: String,
    dueDate: Date,
    priority: String,
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    estimate: Number,
    timeTracked: Number,
    labels: [String],
    status: String,
    number: Number,
  },
  { timestamps: true }
);

module.exports.Task = mongoose.model("Task", TaskSchema);

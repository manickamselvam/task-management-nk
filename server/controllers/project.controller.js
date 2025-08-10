const { Project } = require("../models/project.model");
const { Task } = require("../models/task.model");

module.exports.create = (req, res) => {
  const project = {
    name: req.body.name,
    numTasks: 0,
    users: req.body.users,
    tasks: req.body.tasks,
    dueDate: req.body.dueDate,
  };
  Project.create(project)
    .then((project) => {
      res.json({ project });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.findAll = (req, res) => {
  Project.find({})
    .populate("users")
    .populate("tasks")
    .then((projects) => res.json(projects))
    .catch((err) => res.json(err));
};

module.exports.findByUserId = (req, res) => {
  Project.find({ users: req.params.user })
    .populate("users")
    .populate("tasks")
    .then((projects) => res.json(projects))
    .catch((err) => res.json(err));
};

module.exports.findById = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .populate("users")
    .populate("tasks")
    .then((project) => res.json(project))
    .catch((err) => res.json(err));
};

module.exports.delete = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    //Delete all the tasks
    for (let i = 0; i < project.tasks.length; i++) {
      await Task.deleteOne({ _id: project.tasks[i]._id });
    }
    //Delete the project
    const response = await Project.deleteOne({ _id: req.params.id });
    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.update = (req, res) => {
  Project.updateOne({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((r) => res.json(r))
    .catch((err) => res.status(400).json(err));
};

module.exports.addUser = (req, res) => {
  Project.updateOne(
    { _id: req.params.id },
    { $push: { users: req.params.user } },
    { new: true }
  )
    .then((r) => res.json(r))
    .catch((err) => res.status(400).json(err));
};

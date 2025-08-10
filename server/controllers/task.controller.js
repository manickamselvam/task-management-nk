const { Task } = require("../models/task.model");
const { Project } = require("../models/project.model");

module.exports.create = async (req, res) => {
  try {
    //Get project ID from the body
    const projectID = req.body.projectID;
    //Find the project with the ID passed
    const project = await Project.findById(projectID);
    const newTask = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      assignee: req.body.assignee,
      creator: req.body.creator,
      estimate: req.body.estimate,
      labels: req.body.labels,
      status: "0", //Default status to to do
      number: project.numTasks + 1, //Set task number to the number of tasks already associated with the project +1
    };
    const task = await Task.create(newTask);
    //Link task to the project and update numTasks
    await Project.updateOne({ _id: projectID }, { $push: { tasks: task._id } });
    await Project.updateOne(
      { _id: projectID },
      { $set: { numTasks: project.numTasks + 1 } }
    );
    res.json({ task });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.findAll = (req, res) => {
  Task.find({})
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
};

module.exports.findById = (req, res) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => res.json(task))
    .catch((err) => res.json(err));
};

module.exports.delete = (req, res) => {
  Task.deleteOne({ _id: req.params.id })
    .then((r) => res.json(r))
    .catch((err) => res.json(err));
};

module.exports.update = (req, res) => {
  Task.updateOne({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((r) => res.json(r))
    .catch((err) => res.status(400).json(err));
};

//changed this update function to search by tast.number instead of task._id
// module.exports.update = (req, res) => {
//     Task.updateOne({ number: req.params.id }, req.body, {
//         new: true,
//         runValidators: true,
//     })
//         .then((r) => res.json(r))
//         .catch((err) => res.status(400).json(err));
// };

// module.exports.findByNumber = (req, res) => {
//     Task.findOne({ number: req.params.id })
//         .then((task) => res.json(task))
//         .catch((err) => res.json(err));
// };

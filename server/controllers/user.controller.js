const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );
      res
        .cookie("usertoken", userToken, {
          httpOnly: true,
        })
        .json({ message: "Success!", user: user });
    })
    .catch((err) => {
      console.log("Error in crreate user :", err);
      res.status(400).json(err);
    });
};

module.exports.findAll = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports.findById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((r) => res.json(r))
    .catch((err) => res.json(err));
};

module.exports.update = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((r) => res.json(r))
    .catch((err) => res.status(400).json(err));
};

module.exports.login = async (req, res) => {
  const errorMessage = "Email or password is incorrect";

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      throw new Error(errorMessage);
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      console.log("Password incorrect for: " + req.body.email);
      throw new Error(errorMessage);
    }
    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );
    res
      .cookie("usertoken", userToken, {
        httpOnly: true,
      })
      .json({ message: "Success!", user: user });
  } catch {
    res.status(401).json({ message: errorMessage });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("usertoken");
  res.json({ message: "Logged out successfully" });
};

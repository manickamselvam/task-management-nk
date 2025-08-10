const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");

require("../server/config/mongoose.config");
require("dotenv").config({ path: __dirname + "/./.env" });
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/user.routes")(app);
require("./routes/project.routes")(app);
require("./routes/task.routes")(app);

const server = app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
);

const io = socketIo(server);

io.on("connection", (socket) => {
  //this is for autoupdating the list of issues
  socket.on("new task created", (task) => {
    io.emit("new task added", task);
  });
  socket.on("new comment created", (comment) => {
    console.log("this is the new comment: ", comment);
    io.emit("new comment added", comment);
  });

  //don't think we actually need this
  // socket.on('disconnect', () => {
  //     console.log(`Someone left`);
  // })
});

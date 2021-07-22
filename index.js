require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const chalk = require("chalk");
const SocketServer = require("./socketServer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  morgan(function (tokens, req, res) {
    return (
      chalk.cyanBright(tokens.method(req, res)) +
      " " +
      chalk.green(tokens.url(req, res)) +
      " " +
      chalk.yellow(tokens.status(req, res)) +
      " " +
      chalk.red(tokens["response-time"](req, res))
    );
  })
);

// SocketIO
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

// Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));
app.use("/api", require("./routes/notifyRouter"));

// Connect to server
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    console.log("DB connected!");
    http.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

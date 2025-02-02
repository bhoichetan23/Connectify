const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5501/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established..");
    app.listen(4000, () => {
      console.log("server listening on port number 4000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
  });

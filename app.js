const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const { MONGOURI } = require("./config/keys");

mongoose.set("strictQuery", true);
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

require("./models/user");
require("./models/question");
app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/question"))

app.listen(PORT, () => {
  console.log("Server is Running");
});

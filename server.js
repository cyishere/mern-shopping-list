const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// DB Config
const db = require("./utils/config").MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🍀 MongoDB Connected..."))
  .catch((error) => console.log(error));

const port = require("./utils/config").PORT;

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

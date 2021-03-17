const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./utils/middlewares");
const itemsRoute = require("./routes/items");

const app = express();

// DB Config
const db = require("./utils/config").MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("🍀 MongoDB Connected..."))
  .catch((error) => console.log(error));

// Middlewares
app.use(express.json());

// Routes
app.use("/api/items", itemsRoute);

// Error Hanlder
app.use(errorHandler);

// Start the Server
const port = require("./utils/config").PORT;

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

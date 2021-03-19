const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler, requestLogger } = require("./utils/middlewares");

const app = express();

// DB Config
const db = require("./utils/config").MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("🍀 MongoDB Connected..."))
  .catch((error) => console.log(error));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(requestLogger);

// Routes
const itemsRoute = require("./routes/items");
const usersRoute = require("./routes/users");

app.use("/api/items", itemsRoute);
app.use("/api/users", usersRoute);

// Error Hanlder
app.use(errorHandler);

// Start the Server
const port = require("./utils/config").PORT;

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

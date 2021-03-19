require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  APP_SECRET: process.env.APP_SECRET,
};

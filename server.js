const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  console.log("Shutting down");
  process.exit(1);
});
const Product = require("./models/Product");
const app = require("./app");
const port = process.env.PORT || 3030;

mongoose.connect(process.env.DATABASE||'mongodb://localhost:27017/fullstack', {}).then((con) => {
  console.log("Connected to mongo");
});
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
  console.log("Shutting down");
  server.close(() => {
    process.exit(1);
  });
});

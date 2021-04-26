const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set("debug", true);

    mongoose.connection
      .on("error", (error) => reject(error))
      .on("close", () => console.log("Connection to the DB is closed"))
      .once("open", () => resolve(mongoose.connection));

    mongoose.connect(config.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      usePushEach: true
    });
  });
};

const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://localhost:27017/hunsu",
      {
        dbName: "hunsu",
        useUnifiedTopology: true,
        useNewUrlParser: true
      },
      error => {
        if (error) {
          console.log('MongoDB Connection Failed : ', error);
        } else {
          console.log("MongoDB Connection Successed");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.log("MongoDB Connection Error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected, Reconnecting..");
    connect();
  });
  require("./post");
};

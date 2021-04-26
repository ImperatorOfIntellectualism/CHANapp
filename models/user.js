const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("user", schema);
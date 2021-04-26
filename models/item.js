const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    num: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    image: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("item", schema);

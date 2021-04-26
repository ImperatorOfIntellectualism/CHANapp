const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("cart", schema);
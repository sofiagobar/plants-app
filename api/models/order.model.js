const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/user.model');
const Plant = require('../models/plant.model')

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        name: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plant",
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      }
    ],
  },
  { timestamps: true,
    toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

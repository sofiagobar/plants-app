const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/user.model');
const Plant = require('../models/plant.model');

const orderSchema = new Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        id: String,
        name: String,
        image: String,
        quantity: Number,
        price: Number
      }
    ],
    /*
    isConfirmed: {
      type: Boolean, 
      default: true
    },
    */
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

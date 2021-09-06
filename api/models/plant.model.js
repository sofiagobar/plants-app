const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true,
    },
    price: {
      type: Number,
      required: "Name is required",
    },
    description: {
      type: String,
    },
    environment: {
      type: String,
    },
    petFriendly: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: [String],
    },
    light: {
      type: String,
    },
    water: {
      type: String,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;

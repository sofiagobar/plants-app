const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      required: "email is required",
      unique: true,
      match: [EMAIL_PATTERN, "email is not valid"],
      lowercase: true,
    },
    password: {
      type: String,
      required: "A valid password is required",
      match: [PASSWORD_PATTERN, "the password is invalid"],
    },
    picture: {
      type: String,
    },
    order: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
    },
    social:{
      google: {
          type: String,
      },
    },
    isAdmin:{
      type: Boolean,
      default: false,
    },
    address: String,
    city: String,
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
   }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

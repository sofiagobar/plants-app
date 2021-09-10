const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require('../models/order.model');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    surname: {
      type: String
    },
    email: {
      type: String,
      required: "Email is required",
      unique: [true, "Email already registered"],
      match: [EMAIL_PATTERN, "Email is not valid"],
      lowercase: true,
    },
    password: {
      type: String,
      required: "Password is required",
      match: [PASSWORD_PATTERN, "Password is invalid"],
    },
    picture: {
      type: String,
    },
    order: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }]
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

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
      bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
      });
  } else {
      next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

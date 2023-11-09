const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    required: false,
  },
});

//Creating a model
const UserModel = mongoose.model("user", UserSchema);

//Exporting the model
module.exports = {UserModel};

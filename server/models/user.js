const mongoose = require("mongoose");

const UseSchema = mongoose.Schema({
  firstname: "string",
  lastname: "string",
  email: {
    type: "string",
    unique: true,
  },
  
  password: String,
  active: Boolean,
  //role: String,
 // avatar: String,
});

module.exports = mongoose.model("User", UseSchema);


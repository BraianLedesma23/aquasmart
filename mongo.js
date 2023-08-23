const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://fender99:Oscuro34@cluster0.vioixrk.mongodb.net/proyectopecera?retryWrites=true&w=majority')
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.error(error);
  });

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
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
});

const users = mongoose.model("users", newSchema);

//logica administradores
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const administradores = mongoose.model("administradores", adminSchema);

module.exports = {
  users,
  administradores,
};
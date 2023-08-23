const express = require("express");
const router = express.Router();
const users = require("../models/users");


//Create a new padre
router.post("/users", async (req, res) => {
  try {
    const users = new users(req.body);
    const savedusers = await users.save();
    res.json(savedusers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get every padre
router.get("/users",(req, res) => {
  users
   .find()
   .then((data) => res.json(data))
   .catch((error) => res.json({message: error}));
 });


 //get a padre
 router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
 });

 //update a padre
 router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name,lastname,email } = req.body;
  users
    .updateOne({ _id: id}, { $set: {name, lastname, email} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
 });


 //delete a padre
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el doctor por su ID
    const usersExistente = await users.findById(id);

    // Verificar si se encontró el doctor
    if (!usersExistente) {
      return res.status(404).json({ message: "No encontrado" });
    }

    // Eliminar el doctor
    await usersExistente.deleteOne();

    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
const express = require("express");
const users = require("./mongo").users;
const cors = require("cors");
const administradores = require("./mongo").administradores; // Agrega esta línea al principio del archivo


const mongodb = express();
mongodb.use(express.json());
mongodb.use(express.urlencoded({ extended: true }));
mongodb.use(cors());

mongodb.get("/", cors(), (req, res) => {
  res.send("Welcome to the MongoDB API");
});

//ruta o api de usarios
mongodb.get("/users", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});
//logica para la autoenticacion de los usarios, es decir el login
mongodb.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });

    if (user) {
      if (user.password === password) {
        res.json("exist");
      } else {
        res.json("incorrectPassword");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

/********registro**********/
mongodb.post("/register", async (req, res) => {
  const { name, lastname, email, password /* otros datos de registro */ } = req.body;

  try {
    const usuarioExistente = await users.findOne({ email });

    if (usuarioExistente) {
      res.json("usuarioExiste");
    } else {
      // Crea un nuevo documento de usuario en la colección de MongoDB
      const nuevoUsuario = new users({
        name,
        lastname,
        email,
        password,
        // otros datos de registro...
      });

      await nuevoUsuario.save();
      res.json("success");
    }
  } catch (e) {
    console.error('Error de registro:', e);
    res.json("error");
  }
});

//Ruta o api para los ejercicios
mongodb.get("/ejercicios", async (req, res) => {
  try {
    const allEjercicios = await ejercicios.find();
    res.json(allEjercicios);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving exercises" });
  }
});

//LOGICA ADMINISTRADORES
mongodb.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await administradores.findOne({ email });

    if (admin) {
      if (admin.password === password) {
        res.json("exist");
      } else {
        res.json("incorrectPassword");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});


mongodb.listen(9000, () => {
  console.log("Server connected on port 9000");
});

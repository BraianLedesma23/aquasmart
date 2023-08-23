const router = require("express").Router();
const users = require("../models/user");
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

// Esquema de validaciones de registro
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    lastname: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
});

router.post("/registros", async (req, res) => {
    const { error } = schemaRegister.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Verificar si el correo electrónico ya está registrado
        const isEmailExist = await users.findOne({ email: req.body.email });
        if (isEmailExist) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Generar el hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        // Crear un nuevo usuario
        const user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
        });

        // Guardar el usuario en la base de datos
        const savedUser = await users.save();
        res.json({
            error: null,
            data: savedUser,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Esquema de validaciones de inicio de sesión
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
});

router.post("/login", async (req, res) => {
    // Validaciones de inicio de sesión
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        // Validación de existencia
        const users = await users.findOne({ email: req.body.email });
        if (!users) return res.status(400).json({ error: "Usuario no encontrado" });

        // Validación de password en la base de datos
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json({ error: "Contraseña inválida" });

        // Creando token
        const token = jwt.sign(
            {
                name: users.name,
                id: users._id,
            },
            process.env.TOKEN_SECRET
        );

        // Colocando el token en el encabezado de la respuesta y el cuerpo de la respuesta
        res.header("auth-token", token).json({
            error: null,
            data: { token },
            message: "Bienvenido",
        });

    } catch (err) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;

module.exports = router;

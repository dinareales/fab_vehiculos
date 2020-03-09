const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.dni) {
        res.status(400).send({
            message: "El contenido de la cedula no puede estar vacio!"
        });
        return;
    }

    // Create a user
    const user = {
        name: req.body.name,
        lastName: req.body.lastName,
        dni: req.body.dni
    };

    // Save user in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "A ocurrido un error mientras se crea el usuario"
            });
        });
};

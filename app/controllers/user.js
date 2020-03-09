const db = require("../models");
const User = db.user;
const Cars = db.cars;


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    let body = req.body;
    if (!body.dni) {
        res.status(400).send({
            message: "El contenido de la cedula no puede estar vacio!"
        });
        return;
    }
    // vehicle quantity validation
    if(body.renault === 0 && body.chevrolet === 0 && body.ford === 0 && body.toyota === 0){
        res.status(400).send({
            message: "No es posible realizar un pedido con las cantidades en cero"
        });
        return;
    }
    if (body.renault > 10 || body.chevrolet > 10 || body.ford > 10 || body.toyota > 10){
        res.status(400).send({
            message: "Su solicitud supera el maximo de 10 vehiculos por marca"
        });
        return;
    }

    let order =  {
        "renault": body.renault ,
        "chevrolet" : body.chevrolet,
        "ford" : body.ford,
        "toyota" : body.toyota
    };

    consult_cars().then(function (resp_cars) {
           let cars = [];
            resp_cars.map(car => {
                let orders = {};
                orders["brand"] = car.brand;
                orders["time"] = car.time;

                if (car.brand === "Renault" && order.renault !== 0) {
                    orders["sum_hours"] = order.renault * car.time;
                }
                if (car.brand === "Chevrolet" && order.chevrolet !== 0) {
                    orders["sum_hours"] = order.chevrolet * car.time;
                }
                if (car.brand === "Ford" && order.ford !== 0) {
                    orders["sum_hours"] = order.ford * car.time;
                }
                if (car.brand === "Toyota" && order.toyota !== 0) {
                    orders["sum_hours"] = order.toyota * car.time;
                }

                if(orders.sum_hours) {
                    cars.push(orders);
                }
            });
        console.log("este es el que imporat");
        console.log(cars);

        }).catch(function (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

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

let consult_cars = () => {
   return  Cars.findAll()
        .then(data => {
            return data
        })
        .catch(err => {
          return err;
        });
};

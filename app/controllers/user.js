const db = require("../models");
const User = db.user;
const Cars = db.cars;
var moment = require('moment');



// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    let body = req.body;
    //Validacion no se trabaja el domingo
    let day = moment().format('dddd');
    if(day === 'Sunday'){
        res.status(400).send({
            message: "hoy no trabajo, mañana si"
        });
        return;
    }
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
           let sumatoria = 0
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
                    sumatoria =  orders["sum_hours"] + sumatoria;
                    cars.push(orders);
                }
            });

        cars["sum"] = sumatoria;
        console.log(cars);
        if (day === "Saturday" && cars["sum"] > 4){
            res.status(400).send({
                message: "Su solicitud no podra entregarse el dia de hoy"
            });
            return;
        }
         //traer los horarios disponibles para la fecha actual
        //compararlo con la sumatoria de horas necesarias para el pedido
        // si se cumplen las condiciones se crea la orden con la fecha de entrega
        create_user();
        }).catch(function (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
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

let create_user = (body) => {

    // Create a user
    const user = {
        name: body.name,
        lastName: body.lastName,
        dni: body.dni
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

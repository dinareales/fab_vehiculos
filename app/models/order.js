module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id_user: {
          type: Sequelize.INTEGER
        },
        fecha_entrega: {
            type: Sequelize.DATE
        },
        state: {
            type: Sequelize.BOOLEAN
        }
    });
    return Order;
};

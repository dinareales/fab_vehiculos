module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        dni: {
            type: Sequelize.STRING
        }
    });
    return User;
};

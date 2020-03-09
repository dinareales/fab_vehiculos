module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define("cars", {
            brand: {
                type: DataTypes.STRING,
            },
            time: {
                type: DataTypes.INTEGER,
            },
            id_business: {
                type: DataTypes.INTEGER,
            }
        },
        {
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                    Cars.belongsTo(models.business);
                }
            }
        }
    );

    return Cars;
};

module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define("business", {
        name: {
            type: DataTypes.STRING,
        },
        nit: {
            type: DataTypes.STRING,
        },
    },
        {
            classMethods: {
                associate: function(models) {
                    Business.hasMany(models.schedule);
                }
            }
        }
    );

    return Business;
};

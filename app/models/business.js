module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define("business", {
        name: {
            type: DataTypes.STRING,
            defaultValue: 'empresa xyz'
        },
        nit: {
            type: DataTypes.STRING,
            defaultValue: '459672123-1'
        },
    },
        {
            freezeTableName: true,
        }
    );

    Business.associate = (models) => {
        Business.hasMany(models.schedule);
    };

    return Business;
};

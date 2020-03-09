module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define("schedule", {
            day: {
                type: DataTypes.STRING
            },
            //horarios
            schedule: {
                type: DataTypes.INTEGER
            }
        },
        {
            freezeTableName: true,
        });

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.business);
    };

    return Schedule;
};


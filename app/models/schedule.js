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
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                    Schedule.belongsTo(models.business);
                }
            }
        });

    return Schedule;
};


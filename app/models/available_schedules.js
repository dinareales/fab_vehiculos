module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define("available_schedules", {
            date: {
                type: DataTypes.DATE
            },
            day: {
                type: DataTypes.STRING
            },
            //horarios
            available_schedule: {
                type: DataTypes.INTEGER
            },
            max_hour: {
                type: DataTypes.INTEGER
            }
        },
        {
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                    Schedule.hasMany(models.schedule);
                }
            }
        });

    return Schedule;
};


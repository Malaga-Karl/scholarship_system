module.exports = (sequelize, DataTypes) => {
    const ScholarshipStatus = sequelize.define("ScholarshipStatus", {
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'ScholarshipStatus', // Explicit table name
    });

    ScholarshipStatus.associate = (models) => {
        ScholarshipStatus.hasMany(models.UserProfile, {
            foreignKey: 'scholarship_status',
            as: 'userProfiles', // Optional alias
        });
    };

    return ScholarshipStatus;
};

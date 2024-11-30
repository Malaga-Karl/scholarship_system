module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define("UserProfile", {
        account_email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        scholarship_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ScholarshipStatus', // Matches table name
                key: 'status_id', // Matches primary key in ScholarshipStatus
            },
        },
    });

    // Define associations
    UserProfile.associate = (models) => {
        UserProfile.hasMany(models.ScholarshipStatus, {
            foreignKey: 'scholarship_status', // Matches column in UserProfile
            as: 'ScholarshipStatus',
            onDelete: 'SET NULL',
        });
    };

    return UserProfile;
};

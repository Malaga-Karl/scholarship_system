module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define("UserProfile", {
        account_email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scholarship_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ScholarshipStatus', // Table name for FK constraint
                key: 'status_id',
            },
        },
    });

    // In UserProfile model
    UserProfile.associate = (models) => {
        UserProfile.belongsTo(models.ScholarshipStatus, {
            foreignKey: 'scholarship_status',
            as: 'status', // Ensure this matches the query alias
        });
    };

    

    return UserProfile;
};

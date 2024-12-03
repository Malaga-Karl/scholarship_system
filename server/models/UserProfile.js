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
    }, {
        tableName: 'UserProfile',
    });

    UserProfile.associate = (models) => {
        UserProfile.hasOne(models.StudentScholarship, {
            foreignKey: 'student_email',
            as: 'studentScholarship',
        });
    };

    return UserProfile;
};

module.exports = (sequelize, DataTypes) => {
    const StudentScholarship = sequelize.define("StudentScholarship", {
        student_email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        scholarship_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'StudentScholarship',
    });

    StudentScholarship.associate = (models) => {
        StudentScholarship.belongsTo(models.UserProfile, {
            foreignKey: 'student_email',
            as: 'userProfile',
        });

        StudentScholarship.belongsTo(models.ScholarshipStatus, {
            foreignKey: 'status_id',
            as: 'status',
        });

        StudentScholarship.belongsTo(models.Scholarships, {
            foreignKey: 'scholarship_id',
            as: 'scholarship',
        });
    };

    return StudentScholarship;
};

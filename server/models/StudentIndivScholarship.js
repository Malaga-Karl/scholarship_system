module.exports = (sequelize, DataTypes) => {
    const StudentIndivScholarship = sequelize.define("StudentIndivScholarship", {
        student_email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        indiv_scholarship_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'StudentIndivScholarship',
    });

    StudentIndivScholarship.associate = (models) => {
        StudentIndivScholarship.belongsTo(models.UserProfile, {
            foreignKey: 'student_email',
            as: 'userProfile',
        });

        StudentIndivScholarship.belongsTo(models.ScholarshipStatus, {
            foreignKey: 'status_id',
            as: 'status',
        });

        StudentIndivScholarship.belongsTo(models.IndivScholarships, {
            foreignKey: 'indiv_scholarship_id',
            as: 'indivScholarship',
        });
    };

    return StudentIndivScholarship;
};

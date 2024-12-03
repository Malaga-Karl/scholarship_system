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
        tableName: 'ScholarshipStatus',
    });

    ScholarshipStatus.associate = (models) => {
        ScholarshipStatus.hasMany(models.StudentScholarship, {
            foreignKey: 'status_id',
            as: 'studentScholarships',
        });
    };

    return ScholarshipStatus;
};

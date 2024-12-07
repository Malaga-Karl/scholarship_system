module.exports = (sequelize, DataTypes) => {
    const IndivScholarships = sequelize.define('IndivScholarships', {
        indiv_scholarship_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        logo_path:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        benefits: {
            type: DataTypes.STRING, // Comma-separated string
            allowNull: false,
            set(value) {
                this.setDataValue('benefits', Array.isArray(value) ? value.join(',') : value);
            },
        },
    }, {
        timestamps: true,
        tableName: 'IndivScholarships',
    });

    IndivScholarships.associate = (models) => {
        IndivScholarships.hasMany(models.StudentIndivScholarship, {
            foreignKey: 'indiv_scholarship_id',
            as: 'studentIndivScholarships',
        });
    };

    return IndivScholarships;
};

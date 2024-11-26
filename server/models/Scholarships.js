module.exports = (sequelize, DataTypes) => {
    const Scholarships = sequelize.define('Scholarships', {
      scholarship_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      foundation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slots: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      scholarship_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eligibility: {
        type: DataTypes.STRING, // Comma-separated string
        allowNull: false,
        get() {
          const value = this.getDataValue('eligibility');
          return value ? value.split(',') : [];
        },
        set(value) {
          this.setDataValue('eligibility', Array.isArray(value) ? value.join(',') : value);
        },
      },
      reqs: {
        type: DataTypes.STRING, // Comma-separated string
        allowNull: false,
        get() {
          const value = this.getDataValue('reqs');
          return value ? value.split(',') : [];
        },
        set(value) {
          this.setDataValue('reqs', Array.isArray(value) ? value.join(',') : value);
        },
      },
      benefits: {
        type: DataTypes.STRING, // Comma-separated string
        allowNull: false,
        get() {
          const value = this.getDataValue('benefits');
          return value ? value.split(',') : [];
        },
        set(value) {
          this.setDataValue('benefits', Array.isArray(value) ? value.join(',') : value);
        },
      },
    }, {
      timestamps: true,
      tableName: 'Scholarships',
    });
  
    Scholarships.associate = (models) => {
      Scholarships.belongsTo(models.Foundations, {
        foreignKey: 'foundation_id',
        as: 'foundation',
      });
    };
  
    return Scholarships;
  };
  
module.exports = (sequelize, DataTypes) => {
  const Foundations = sequelize.define('Foundations', {
    foundation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_path: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  }, {
    timestamps: true,
    tableName: 'Foundations',
  });

  Foundations.associate = (models) => {
    Foundations.hasMany(models.Scholarships, {
      foreignKey: 'foundation_id',
      as: 'scholarships',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Foundations;
};

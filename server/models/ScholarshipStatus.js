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
      tableName: 'ScholarshipStatus', // Optional: Ensure it matches the database table
  });

  ScholarshipStatus.associate = (models) => {
      ScholarshipStatus.belongsTo(models.UserProfile, {
          foreignKey: 'scholarship_status', // Matches column in UserProfile
          as: 'userProfiles',
          onDelete: 'SET NULL',
      });
  };

  return ScholarshipStatus;
};

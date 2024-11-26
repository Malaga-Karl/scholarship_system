module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define("UserProfile", {
      user_id: {
          type: DataTypes.STRING(9), // Sets the field to a string with a max length of 9
          primaryKey: true,
          allowNull: false,
          validate: {
              len: [9, 9] // Ensures the string has exactly 9 characters
          }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notification_settings: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      course:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      department:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    // Define the association: one-to-one relationship with the Authentication model
    UserProfile.associate = (models) => {
        UserProfile.belongsTo(models.UserAuthentication, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    };
  
    return UserProfile;
  };
  
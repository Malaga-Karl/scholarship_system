module.exports = (sequelize, DataTypes) => {
    const UserAuthentication = sequelize.define("UserAuthentication", {
      user_id: {
        type: DataTypes.STRING(9), // Sets the field to a string with a max length of 9
        primaryKey: true,
        allowNull: false,
        validate: {
          len: [9, 9] // Ensures the string has exactly 9 characters
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      failed_login_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      account_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    // Define the association: one-to-one relationship with the User model
    UserAuthentication.associate = (models) => {
      UserAuthentication.hasOne(models.UserProfile, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    };
  
    return UserAuthentication;
  };
  
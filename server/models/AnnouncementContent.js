// models/AnnouncementHeader.js

module.exports = (sequelize, DataTypes) => {
    const AnnouncementContent = sequelize.define('AnnouncementContent', {
      announcement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false, // Status is mandatory (e.g., active, archived)
        defaultValue: 'No Content', // Default status can be "active"
      }
    }, {
      timestamps: true, // Automatically add `createdAt` and `updatedAt`
      tableName: 'AnnouncementContent', // Explicit table name
    });

    
    AnnouncementContent.associate = (models) => {
        AnnouncementContent.belongsTo(models.AnnouncementHeader, {
          foreignKey: 'announcement_id',
          as: 'header', // Alias for the relationship
        });
      };
    
  
    return AnnouncementContent;
  };
  
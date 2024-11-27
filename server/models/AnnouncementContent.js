// models/AnnouncementHeader.js

module.exports = (sequelize, DataTypes) => {
    const AnnouncementContent = sequelize.define('AnnouncementContent', {
      announcement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false, // Status is mandatory (e.g., active, archived)
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
  
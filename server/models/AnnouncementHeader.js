// models/AnnouncementHeader.js

module.exports = (sequelize, DataTypes) => {
    const AnnouncementHeader = sequelize.define('AnnouncementHeader', {
      announcement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Description is optional
      },
      cover_path: { //for the cover image
        type: DataTypes.TEXT,
        allowNull: true, 
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false, // Status is mandatory (e.g., active, archived)
        defaultValue: 'active', // Default status can be "active"
      }
    }, {
      timestamps: true, // Automatically add `createdAt` and `updatedAt`
      tableName: 'announcementheaders', // Explicit table name
    });
    AnnouncementHeader.associate = (models) => {
      AnnouncementHeader.hasOne(models.AnnouncementContent, {
        foreignKey: 'announcement_id', // Foreign key in AnnouncementContent
        as: 'content', // Alias for the relationship
        onDelete: 'CASCADE', // Cascade delete related content
        onUpdate: 'CASCADE', // Cascade update
      });
    };

    return AnnouncementHeader;
  };
  
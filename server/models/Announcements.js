module.exports = (sequelize, DataTypes) => {
    const Announcements = sequelize.define("Announcements", {
        post_header:{
            type: DataTypes.STRING,
            allowNULL: false,
            validate: {
                notEmpty: true,
            }
        },
        description:{
            type: DataTypes.TEXT,
            allowNULL: false,
            validate: {
                notEmpty: true,
            }
        },
        coverImagePath:{
            type: DataTypes.STRING,
            allowNULL: false,
            validate: {
                notEmpty: true,
            }
        }
    })
    return Announcements;
}
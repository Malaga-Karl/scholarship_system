module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        email:{
            type: DataTypes.STRING,
            allowNULL: false,
        },
        password:{
            type: DataTypes.TEXT,
            allowNULL: false,
        }
    })
    return Users;
}
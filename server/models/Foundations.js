module.exports = (sequelize, DataTypes) => {
    const Foundations = sequelize.define("Foundations", {
        name:{
            type: DataTypes.STRING,
            allowNULL: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNULL: false,
        },
        logoPath:{
            type: DataTypes.STRING,
            allowNULL: false,
        }
    })
    return Foundations;
}
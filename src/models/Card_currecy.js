module.exports = (sequelize, DataTypes)=>{
    var card_currency = sequelize.define('Card_currency',{
        uuid:DataTypes.STRING,
        currency:DataTypes.STRING

    })
    return card_currency;
}
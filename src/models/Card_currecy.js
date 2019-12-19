module.exports = (sequelize, DataTypes)=>{
    var card_currency = sequelize.define('Card_currency',{
        uuid:DataTypes.STRING,
        currency:DataTypes.STRING

    })

    card_currency.associate = function(models){
        card_currency.hasMany(models.Rate_variation);
        
    }

    return card_currency;
}
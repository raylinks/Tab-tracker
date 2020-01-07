module.exports = (sequelize, DataTypes)=>{
    var card_currency = sequelize.define('CardCurrency',{
        uuid:DataTypes.STRING,
        currency:DataTypes.STRING

    })

    card_currency.associate = function(models){
        card_currency.hasMany(models.RateVariation);
        
    }

    return card_currency;
}
module.exports =(sequelize, DataTypes)=>{
    const card = sequelize.define('Card',{
        uuid:DataTypes.STRING,
        name: DataTypes.STRING,
        type:DataTypes.STRING,
        picture:DataTypes.STRING,
        information:DataTypes.STRING

    });
    
    card.associate = function(models){
        card.hasMany(models.CardCurrency);
        card.hasMany(models.RateVariation)
    }

    return card;
}

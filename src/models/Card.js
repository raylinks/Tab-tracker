module.exports =(sequelize, DataTypes)=>{
    const card = sequelize.define('Card',{
        uuid:DataTypes.STRING,
        name: DataTypes.STRING,
        type:DataTypes.STRING,
//picture:DataTypes.STRING,
        information:DataTypes.STRING

    });
    
    card.associate = function(models){
        card.hasMany(models.Card_currency);
        card.hasMany(models.Rate_variation)
    }

    return card;
}

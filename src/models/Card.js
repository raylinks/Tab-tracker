module.exports =(sequelize, DataTypes)=>{
    const card = sequelize.define('Card',{
        uuid:DataTypes.STRING,
        name: DataTypes.STRING,
        type:DataTypes.STRING,
        picture:DataTypes.STRING,
        information:DataTypes.STRING

    });
    
    card.association = function(models){
        card.hasMany(models.Card_currency);
    }

    return card;
}

module.exports = (sequelize, DataTypes)=>{
    var variation = sequelize.define('RateVariation',{
        uuid: DataTypes.STRING,
        transaction_type:DataTypes.STRING,
        card_acceptance_form: DataTypes.STRING,
        face_value_range_from: DataTypes.INTEGER,
        face_value_range_to :DataTypes.INTEGER,
        rate:DataTypes.STRING
    });
    
    variation.associate = function(models){
        variation.hasOne(models.CardBuy)
    };


    return variation;
}


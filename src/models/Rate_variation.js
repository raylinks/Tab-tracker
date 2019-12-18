module.exports = (sequelize, DataTypes)=>{
    var rate_variation = sequelize.define('Rate_variation',{
        uuid: DataTypes.STRING,
        transaction_type:DataTypes.STRING,
        card_acceptance_form: DataTypes.STRING,
        face_value_range_from: DataTypes.INTEGER,
        face_value_range_to :DataTypes.INTEGER,
        rate:DataTypes.STRING
    });
    
    return rate_variation;
}


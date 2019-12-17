module.exports = (sequelize, DataTypes)=>{
    var rate_variation = sequelize.define('Rate_variation',{
        uuid: DataTypes.INTEGER
    })
    ;
    return rate_variation;
}


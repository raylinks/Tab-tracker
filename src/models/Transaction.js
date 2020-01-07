module.exports = (sequelize, Datatypes)=>{
    var transaction =  sequelize.define('Transaction',{
        'uuid' : Datatypes.STRING,
        'reference_code' : Datatypes.STRING,
        'type': Datatypes.STRING,
        'status' : Datatypes.STRING,
    });
    transaction.associate = function(models){
        transaction.hasMany(models.WalletHistory)
        transaction.hasOne(models.CardBuy)
    }

    return transaction
} 
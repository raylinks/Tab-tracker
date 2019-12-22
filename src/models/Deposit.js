module.exports = (sequelize, Datatypes)=>{
    var deposit =  sequelize.define('Deposit',{
        'transaction_id' : Datatypes.STRING,
        'deposit_type' :Datatypes.STRING,
        'deposit_amount' :Datatypes.STRING,
        'status' :Datatypes.STRING,
        'reference_code':Datatypes.STRING,
    })
    return deposit;
}
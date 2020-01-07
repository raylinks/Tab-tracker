module.exports = (sequelize,Datatypes)=>{
   var walletHistory = sequelize.define('WalletHistory',{
        uuid: Datatypes.INTEGER,
        current_balance:Datatypes.INTEGER,
        previous_balance:Datatypes.INTEGER,
        status:Datatypes.BOOLEAN

    })
    return walletHistory;
}
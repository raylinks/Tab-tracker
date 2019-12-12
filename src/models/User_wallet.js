module.exports = (sequelize,DataType)=>{
var user_wallet = sequelize.define('User_wallet',{
    initial_amount: DataType.INTEGER,
    actual_amount: DataType.INTEGER
});
return user_wallet
}
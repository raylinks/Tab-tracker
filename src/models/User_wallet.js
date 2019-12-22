module.exports = (sequelize,DataType)=>{
var userwallet = sequelize.define('User_wallet',{
    uuid:DataType.STRING,
    initial_amount: DataType.INTEGER,
    actual_amount: DataType.INTEGER
});
return userwallet
}
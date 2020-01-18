module.exports = (sequelize, DataTypes)=>{
    var token  = sequelize.define('Token',{
        userToken: DataTypes.STRING
    });
   
    return token;
}
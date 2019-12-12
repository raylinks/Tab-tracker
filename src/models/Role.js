module.exports = (sequelize, DataTypes)=>{
    var role  = sequelize.define('Role',{
        name:DataTypes.STRING
    });
    role.associate = function(models){
        role.hasMany(models.User)
     
    };
    return role;
}
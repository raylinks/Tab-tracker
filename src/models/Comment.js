module.exports = (sequelize, DataTypes) =>{
    const comment = sequelize.define('Comment',{
        body: DataTypes.STRING,
       // email: DataTypes.STRING,
        //firstname: DataTypes.STRING
    });


    comment.associate = function(models){
        comment.belongsTo(models.Post);
    };

    return comment

}

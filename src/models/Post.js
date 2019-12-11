module.exports = (Sequelize,Datatypes) =>{
var user  =   Sequelize.define('Post',{
    userId:{
    type: Datatypes.INTEGER,
    references: {
        model: 'Posts',
        key: 'id'
        }
        },
    title: Datatypes.STRING,
    content:Datatypes.STRING
    });
    user.associate = function(models){
        user.belongsToMany(models.Post, { as: 'Comment', through: 'PostComment'});
        user.hasMany(models.Like);
      
    };

    
    return user
}

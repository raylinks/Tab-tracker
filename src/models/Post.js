module.exports = (Sequelize,Datatypes) =>{
var post  =   Sequelize.define('Post',{
    // userId:{
    // type: Datatypes.INTEGER,
    // references: {
    //     model: 'Posts',
    //     key: 'id'
    //     }
    //     },
    title: Datatypes.STRING,
    content:Datatypes.STRING
    });
    post.associate = function(models){
        post.hasMany(models.Like);
        post.hasMany(models.Comment);
      
    };

    
    return post
}

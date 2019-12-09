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
    return user
}

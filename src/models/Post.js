module.exports = (Sequelize,Datatypes) =>{
var user  =   Sequelize.define('Post',{
    userId:Datatypes.INTEGER,
    title: Datatypes.STRING,
    content:Datatypes.STRING
    });
    return user
}
// userId:{
//     type: Datatypes.INTEGER,
//     references:     'User',
//     referencesKey:  'id',
//     onDelete:       'cascade'
// },
module.exports =(sequelize,Datatypes)=> {
    var ref = sequelize.define('Ref',{
        val:Datatypes.STRING,
        amount:Datatypes.INTEGER
    });
    return ref
}
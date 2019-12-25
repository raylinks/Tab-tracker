module.exports =(sequelize,Datatypes)=> {
    var ref = sequelize.define('Ref',{
        val:Datatypes.STRING,
        amount:Datatypes.INTEGER,
        status:Datatypes.BOOLEAN
    });
    return ref
}
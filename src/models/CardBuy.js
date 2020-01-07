module.exports = (sequelize,Datatypes)=>{
    var cardBuy = sequelize.define('CardBuy',{
        // user_id:Datatypes.INTEGER,
        // transaction_id:Datatypes.STRING,
        uuid: Datatypes.STRING,
       // rate_variation_id:Datatypes.INTEGER,
        amount:Datatypes.INTEGER,
        rate_at_sale:Datatypes.STRING,
        responded_by:Datatypes.INTEGER,
        status:Datatypes.BOOLEAN

      
    });
    return cardBuy
}
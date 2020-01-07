module.exports = (sequelize,Datatypes)=>{
    var cardSales = sequelize.define('Card_Sales',{
        // user_id:Datatypes.INTEGER,
        // transaction_id:Datatypes.STRING,
        // rate_variation_id:Datatypes.STRING,
        // rate_at_sale:Datatypes.STRING,
        // confirmed_rate_at_sale:Datatypes.STRING,
        // face_value:Datatypes.STRING,
        // card_type:Datatypes.STRING,
        // card_uploaded_url:Datatypes.STRING,
        // amount:Datatypes.STRING,
        // responded_by:Datatypes.STRING,
        // response_message:Datatypes.STRING,
        // response_data:Datatypes.STRING,
        // status:Datatypes.STRING,
        // is_resolved:Datatypes.STRING,
        // is_moved_to_paxful:Datatypes.STRING,
        // paxful_agent:Datatypes.STRING,
        // declined_message:Datatypes.STRING,
        // vendor_id:Datatypes.STRING,
        // apple_id:Datatypes.STRING
    });
    return cardSales
}
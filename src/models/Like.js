const {Like} = require('../models/Like')

module.exports=(sequelize,DataTypes)=>{
    const like =sequelize.define('Like',{

    });
    return like;
}
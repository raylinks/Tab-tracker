
'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../../services/util.service');
const CONFIG            = require('../config/config');
const Promise           = require('bluebird');


module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('User', {
        firstname     : {
            type: DataTypes.STRING,
            required: [true, 'firstname is required'],
            },
        lastname      :{
            type: DataTypes.STRING,
            required: [true, 'lastname is required'],
        },
            email     : {
            type: DataTypes.STRING,
             allowNull: true,
             unique: true, 
                validate: { 
                    isEmail: {msg: "Email is  invalid."} }
                },
        phone     : {type: DataTypes.STRING, allowNull: true, unique: true, 
                        validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, 
                        isNumeric: { msg: "not a valid phone number."} }},
        password  : {
            type:DataTypes.STRING,
            required: [true, 'password is required'],
        },

        token: DataTypes.STRING,
        refer_link:DataTypes.STRING,
        verified_at: DataTypes.DATE
       // EmailConfirm : {type: DataTypes.BOOLEAN, defaultValue: false},
        //OTP  : DataTypes.STRING,
    });

    Model.associate = function(models){
        Model.hasMany(models.Post)
        Model.hasMany(models.Comment)
        Model.hasMany(models.Like);
        Model.hasOne(models.UserWallet);
        Model.hasMany(models.Ref);
        Model.hasMany(models.Transaction);
        Model.hasMany(models.Deposit);
        Model.hasMany(models.WalletHistory);
        Model.hasMany(models.CardBuy);
        Model.hasOne(models.Token);
        

    };
    

    // Model.associate = function(models){
    //     this.Companies = this.hasOne(models.df
    //          );
    // };

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = function(password){
        return bcrypt.compareAsync(password, this.password)
    }

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
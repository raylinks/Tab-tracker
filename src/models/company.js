const {TE, to} = require('../../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Company', {
    BusinessName: DataTypes.STRING,
    BusinessSector: DataTypes.STRING,
    RcNumber: DataTypes.STRING,
    BusinessEmail: DataTypes.STRING,
    Address: DataTypes.STRING,
    EmployeeNumber: DataTypes.STRING,
    DirectorsNumber: DataTypes.INTEGER,
    EmployeeNumber: DataTypes.INTEGER
  });

  Model.associate = function(models){
      this.Users = this.belongsTo(models.User);
  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};


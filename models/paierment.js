/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paierment', {
    id_paiement: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type_paiement: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    date_paiement: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_facture: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'facture',
        key: 'id_facture'
      },
      unique: true
    }
  }, {
    tableName: 'paierment'
  });
};

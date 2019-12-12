/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ville', {
    id_ville: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    code_postal: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    code_pays: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      references: {
        model: 'pays',
        key: 'code_pays'
      }
    },
    id_maire: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'maire',
        key: 'id_maire'
      },
      unique: true
    }
  }, {
    tableName: 'ville'
  });
};

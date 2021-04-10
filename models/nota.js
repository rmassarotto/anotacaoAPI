const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Nota = sequelize.define(
    'nota',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      titulo: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      tableName: 'nota',
      timestamps: false,
    }
  );

  return Nota;
};

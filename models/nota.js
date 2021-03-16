module.exports = function (sequelize, DataTypes) {
  const Nota = sequelize.define('nota',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'nota',
      timestamps: true
    }
  );

  Nota.associate = function (models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId'
    })
  }

  return Nota;
}
module.exports = function (sequelize, DataTypes) {
  const Tag = sequelize.define('tag',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      notaId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'tag',
      timestamps: false
    }
  );

  return Tag;
}
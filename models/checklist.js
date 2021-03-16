module.exports = function (sequelize, DataTypes) {
  const Checklist = sequelize.define('checklist',
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
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: 'checklist',
      timestamps: false
    }
  );

  return Checklist;
}
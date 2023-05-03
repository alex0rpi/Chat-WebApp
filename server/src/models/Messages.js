export default (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'Messages',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      text: { type: DataTypes.STRING, allowNull: false },
      room: { type: DataTypes.STRING, allowNull: true },
      created_at: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false
    }
  );
  return Messages;
};

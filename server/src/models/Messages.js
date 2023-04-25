export default (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'Messages',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      room: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );
  return Messages;
};

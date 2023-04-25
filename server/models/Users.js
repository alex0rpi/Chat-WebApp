export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: { type: DataTypes.STRING, allowNull: false },
      // pwd: { type: DataTypes.STRING, allowNull: false },
    },
    {
      lastConnected: { type: DataTypes.DATE, allowNull: false },
    },
    {
      room: { type: DataTypes.STRING, allowNull: true },
    },
    {
      active: { type: DataTypes.BOOLEAN, allowNull: false },
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Messages, {
      onDelete: 'cascade',
    });
  };

  return Users;
};

export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: { type: DataTypes.STRING, allowNull: false },
      connectedAt: { type: DataTypes.STRING, allowNull: false },
      room: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Messages, {
      onDelete: 'cascade',
    });
  };

  return Users;
};

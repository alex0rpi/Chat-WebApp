export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false },
      room: { type: DataTypes.STRING, allowNull: true },
      active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
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

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
      unique: true
    },
    displayName: {
      type: DataTypes.STRING
    },
    password: DataTypes.STRING
  });

  User.associate = (models) => {
    User.hasMany(models.Message, {
      onDelete: 'cascade',
    });
  };

  return User;
}
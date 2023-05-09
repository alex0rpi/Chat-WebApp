export default (sequelize, DataTypes, User, Room) => {
  const Message = sequelize.define('messages', {
    messageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING
    },
    // I prefer to manually specify the createdAt field.
    createdAt: {
      type: DataTypes.STRING,
    }
  },
    {
      timestamps: false,
    }
  )
  return Message
}
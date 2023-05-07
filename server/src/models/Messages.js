export default (sequelize, DataTypes, User, Room) => {
  const Message = sequelize.define('messages', {
    messageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING
    }
  },
    // on timestamps, only enable createdAt, disable updatedAt
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false
    }

  )

  return Message
}
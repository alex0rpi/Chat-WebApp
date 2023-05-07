export default (sequelize, DataTypes) => {
    const Room = sequelize.define('room', {
        roomId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roomName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            collate: 'utf8_bin'
        }
    },
        {
            timestamps: false
        }
    );
    Room.associate = (models) => {
        Room.hasMany(models.Message, {
            onDelete: 'cascade',
        });
    }

    return Room
}

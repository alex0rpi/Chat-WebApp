import { UserRoom } from '../../models/initModels';

class UserRoomRepository {
  async findRoomByUserId(userId: string | number) {
    const room = await UserRoom.findOne({ where: { userId } });
    return room;
    // Returns a room object containing userId and roomId.
  }

  //   Delete rooms containing userId
  async deleteUserRooms(userId: string | number) {
    await UserRoom.destroy({ where: { userId } });
  }

  //   Add a given user to a given room
  async addUserToRoom(userId: number, roomId: number) {
    await UserRoom.create({ userId, roomId });
  }
}

export default UserRoomRepository;

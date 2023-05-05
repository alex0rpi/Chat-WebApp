import { UserRoom } from '../../models/initModels';

class UserRoomRepository {
  async findRoomByUserId(userId: string | number) {
    const room = await UserRoom.findOne({ where: { userId } });
    return room;
  }

  //   Delete rooms containing userId
  async deleteUserRooms(userId: string | number) {
    await UserRoom.destroy({ where: { userId } });
  }
}

export default UserRoomRepository;

import { Room } from '../../models/initModels';
import { User } from '../../models/initModels';

class RoomRepository {
  async createRoom(roomName: string) {
    await Room.create({ roomName });
  }

  async retrieveRoomByName(roomName: string) {
    let existingRoom = await Room.findOne({ where: { roomName } });
    return existingRoom;
  }

  async retrieveRoomById(roomId: string) {
    let existingRoom = await Room.findOne({ where: { roomId } });
    return existingRoom;
  }

  async getAllRooms() {
    const rooms = await Room.findAll();
    return rooms;
  }

  async getAllRoomsAndUsers() {
    const rooms = await Room.findAll({
      include: [{ model: User }],
    });
    return rooms;
  }
}

export default RoomRepository;

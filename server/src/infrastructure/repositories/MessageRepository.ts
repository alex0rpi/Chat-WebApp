import moment from 'moment';
import { Message } from '../../models/initModels';
import { User } from '../../models/initModels';

class MessageRepository {
  // Afegir un missatge d'un user al welcome xat o a una room en concret si aplica.
  async createMessage(
    userId: number | null,
    userName: string | null,
    roomId: number,
    message: string,
  ) {
    const msgDate = moment().format('YYYY-MM-DD, HH:mm:ss');
    await Message.create({ message, createdAt: msgDate, userId, roomId, userName });
  }

  // Recover all messages existing in a room.
  async retrieveRoomMessages(roomId: number) {
    const messageList = await Message.findAll(
      { where: { roomId } },
      { include: [{ model: User, as: 'user', where: { userId: User.userId } }] }, // this should include the username
      { order: [['createdAt', 'ASC']] }
    );
    return messageList;
    //this query, along with the messages it includes the user who wrote it (as: 'user')
  }

}

export default MessageRepository;

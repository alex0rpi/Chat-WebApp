import moment from 'moment';
import { Message } from '../../models/initModels';
import { User } from '../../models/initModels';

class MessageRepository {
  // Afegir un missatge d'un user al welcome xat o a una room en concret si aplica.
  async createMessage(message: string, userId: number | null, roomId: number) {
    const msgDate = moment().format('YYYY-MM-DD, HH:mm:ss');
    await Message.create({ message, createdAt: msgDate, userId, roomId });
  }

  // Recover all messages existing in a room.
  async retrieveRoomMessages(roomId: number) {
    const messageList = await Message.findAll(
      { where: { roomId } },
      { include: [{ model: User, as: 'user' }] }, // this should include the username
      { order: [['createdAt', 'ASC']] }
    );
    return messageList;
    //this query, along with the messages it includes the user who wrote it (as: 'user')
  }

  // En cas que vulgui esborrar missatges d'un user, potser ho trec això.
  // async deleteUserMessages(UserId: number, room: string) {
  //   const userMessages = await Message.findAll({ where: { UserId } });
  //   if (userMessages) {
  //     await Message.destroy({ where: { UserId } });
  //   }
  // }

  // Recuperar tots els missatges d'un usuari i per una room en concret si aplica.
  // async retrieveUserMessages(UserId: number, room: string) {
  //   const messageList = await Message.findAll(
  //     { attributes: { exclude: ['id'] } },
  //     { where: { UserId, room } },
  //     { raw: true }
  //   );
  //   return messageList;
  // }

  // En cas que vulgui contar missatges que ha fet un user ACTIU en una room.
  // async countUserMessages(UserId: number, room: string) {
  //   const numberOfMsg = await Message.count({ where: { UserId, room } });
  //   return numberOfMsg;
  // }
}

export default MessageRepository;

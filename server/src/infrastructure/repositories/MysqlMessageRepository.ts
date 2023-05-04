import { Messages } from '../../models/initModels';

class MysqlGameRepository {
  // Afegir un missatge d'un user al welcome xat o a una room en concret si aplica.
  async createMessage(text: string, created_at: string, UserId: number, room?: string) {
    await Messages.create({ text, room, UserId, created_at });
  }

  // En cas que vulgui esborrar missatges d'un user, potser ho trec això.
  async deleteUserMessages(UserId: number, room: string) {
    const userMessages = await Messages.findAll({ where: { UserId } });
    if (userMessages) {
      await Messages.destroy({ where: { UserId } });
    }
  }

  // Recuperar tots els missatges d'un usuari i per una room en concret si aplica.
  async retrieveUserMessages(UserId: number, room: string) {
    const messageList = await Messages.findAll(
      { attributes: { exclude: ['id'] } },
      { where: { UserId, room } },
      { raw: true }
    );
    return messageList;
  }

  // En cas que vulgui contar missatges que ha fet un user ACTIU en una room.
  async countUserMessages(UserId: number, room: string) {
    const numberOfMsg = await Messages.count({ where: { UserId, room } });
    return numberOfMsg;
  }
}

export default MysqlGameRepository;

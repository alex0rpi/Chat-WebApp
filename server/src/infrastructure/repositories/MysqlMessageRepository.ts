import { Messages } from '../../models/initModels';

class MysqlGameRepository {
  // Afegir un missatge d'un user al welcome xat o a una room en concret si aplica.
  async createMessage(UserId: number, text: string, time: string, room?: string) {
    const newGame = await Messages.create({ text, room, UserId, created_at: time });
    return newGame;
  }

  // En cas que vulgui esborrar missatges d'un user, potser ho trec això.
  async deleteUserMessages(UserId: number, room: string) {
    const hasGames = await Messages.findAll({ where: { UserId } });
    if (hasGames) {
      await Messages.destroy({ where: { UserId } });
    }
  }

  // Recuperar tots els missatges d'un usuari i per una room en concret si aplica.
  async retrieveUserMessages(UserId: number, room: string) {
    const messageList = await Messages.findAll(
      { where: { UserId } },
      { attributes: { exclude: ['UserId'] } },
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

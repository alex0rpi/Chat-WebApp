import { Messages } from '../../models/initModels';


class MysqlGameRepository {
  // Afegir un missatge d'un user al welcome xat o a una room en concret si aplica.
  async createMessage(id, text, room) {
    const newGame = await Messages.create({});
    return newGame;
  }

  // En cas que vulgui esborrar missatges d'un user, potser ho trec això.
  async deleteUserMessages(id, room) {
    const hasGames = await Messages.findAll({ where: { UserId: id } });
    if (hasGames) {
      await Messages.destroy({ where: { UserId: id } });
    }
  }

  // Recuperar tots els missatges d'un usuari i per una room en concret si aplica.
  async retrieveUserMessages(id, room) {
    const messageList = await Messages.findAll(
      { where: { UserId: id } },
      { attributes: { exclude: ['UserId'] } },
      { raw: true }
    );
    return messageList;
  }

  // En cas que vulgui contar missatges que ha fet un user ACTIU en una room.
  async countUserMessages(id, room) {
    const numberOfMsg = await Messages.count({ where: { UserId: id, Room:room } });
    return numberOfMsg;
  }

}

export default MysqlGameRepository;
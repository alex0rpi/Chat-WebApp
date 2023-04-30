import moment from 'moment';
import { Users } from '../../models/initModels';

class MysqlUserRepository {
  async create(username: string, connectedAt: string, room?: string) {
    await Users.create({ username, connectedAt, room });
  }

  async retrieveUsers(room?: string) {
    if (room) {
      const users = await Users.findAll({
        attributes: ['username'],
        where: { room },
        raw: true,
      });
      return users; // [ { username: 'user1' }, { username: 'user2' } ]
    }
    const users = await Users.findAll({
      attributes: ['username'],
      raw: true,
    });
    return users;
  }

  async retrieveByName(username: string) {
    const existingUser = await Users.findOne({ where: { username } });
    return existingUser;
  }

  async retrieveById(id: number) {
    let existingUser = await Users.findOne({ where: { id } }, { attributes: ['id', 'username'], raw: true });
    return existingUser;
  }

  // Contar el nombre d'usuaris que hi ha en una room (si hi són es que estan actius)
  async countUsersInRoom(room: string) {
    const numberOfUsers = await Users.count({ where: { room } });
    return numberOfUsers;
  }
}

export default MysqlUserRepository;

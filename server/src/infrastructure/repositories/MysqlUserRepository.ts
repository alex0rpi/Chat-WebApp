import { Users } from '../../models/initModels';

class MysqlUserRepository {
  async create(username: string, active: boolean, room?: string) {
    return await Users.create({ username, room, active });
  }

  async retrieveUsers(room?: string) {
    if (room) {
      const users = await Users.findAll({
        attributes: ['username'],
        where: { room, active: true },
        raw: true,
      });
      return users; // [ { username: 'user1' }, { username: 'user2' } ]
    }
    const users = await Users.findAll({
      attributes: ['username'],
      where: { active: true },
      raw: true,
    });
    return users;
  }

  async setUserLoggedOut(uid: number) {
    await Users.update({ active: false }, { where: { id: uid } });
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
    const numberOfUsers = await Users.count({ where: { room, active: true } });
    return numberOfUsers;
  }
}

export default MysqlUserRepository;

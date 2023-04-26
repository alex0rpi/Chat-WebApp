import { Users } from '../../models/initModels';

class MysqlUserRepository {
  async create(username: string) {
    await Users.create({ username });
  }

  async retrieveById(id: number) {
    let existingUser = await Users.findOne({ where: { id } }, { attributes: ['id', 'username'], raw: true });
    return existingUser;
  }

  async retrieveByName(username: string) {
    let existingUser = await Users.findOne({ where: { username: name } });
    return existingUser;
  }

  async retrieveAll(room?: string) {
    const users = await Users.findAll({
      attributes: ['id', 'username'],
      raw: true,
    });
    return users;
  }

  // Contar el nombre d'usuaris que hi ha en una room (si hi són es que estan actius)
  async countUsersInRoom(room: string) {
    const numberOfUsers = await Users.count({ where: { room, active: true } });
    return numberOfUsers;
  }
}

export default MysqlUserRepository;

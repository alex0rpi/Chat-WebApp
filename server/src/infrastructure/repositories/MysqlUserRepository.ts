import { Users } from '../../models/initModels';

class MysqlUserRepository {
  async create(username, password) {
    await Users.create({ username, pwd: password });
  }

  async retrieveById(id) {
    let existingUser = await Users.findOne({ where: { id } }, { attributes: ['id', 'username'], raw: true });
    return existingUser;
  }

  async retrieveByName(name) {
    let existingUser = await Users.findOne({ where: { username: name } });
    return existingUser;
  }

  async retrieveAll() {
    const users = await Users.findAll({
      attributes: ['id', 'username'],
      raw: true,
    });
    return users;
  }

  // Contar el nombre d'usuaris que hi ha en una room (si hi són es que estan actius)
  async countUsersInRoom(room) {
    const numberOfUsers = await Users.count({ where: { Room: room, active: true } });
    return numberOfUsers;
  }
}

export default MysqlUserRepository;

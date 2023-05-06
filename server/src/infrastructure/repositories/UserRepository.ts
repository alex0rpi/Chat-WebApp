import { User } from '../../models/initModels';

class UserRepository {
  async create(username: string, displayName: string, password: string) {
    const newUser = await User.create({ username, displayName, password });
    return newUser;
  }

  async retrieveByName(username: string) {
    const existingUser = await User.findOne({ where: { username } });
    return existingUser;
  }

  async retrieveById(id: number) {
    // let existingUser = await User.findOne({ where: { id } }, { attributes: ['id', 'username'], raw: true });
    let existingUser = await User.findOne({ where: { id } });
    return existingUser;
  }

  // async retrieveUsers(room?: string) {
  //   if (room) {
  //     const users = await User.findAll({
  //       attributes: ['username'],
  //       where: { room, active: true },
  //       raw: true,
  //     });
  //     return users;
  //   }
  //   const users = await User.findAll({
  //     attributes: ['username'],
  //     where: { active: true },
  //     raw: true,
  //   });
  //   return users;
  // }

  // async setUserActive(username: string) {
  //   await User.update({ active: true }, { where: { username } });
  // }

  // async setUserLoggedOut(uid: number) {
  //   await User.update({ active: false, room: null }, { where: { id: uid } });
  // }

  // Contar el nombre d'usuaris que hi ha en una room (si hi són es que estan actius)
  // async countUsersInRoom(room: string) {
  //   const numberOfUsers = await User.count({ where: { room, active: true } });
  //   return numberOfUsers;
  // }
}

export default UserRepository;

import { User } from '../../models/initModels';

class UserRepository {
  async create(userName: string, password: string) {
    const newUser = await User.create({ userName, password });
    return newUser;
  }

  async retrieveByName(userName: string) {
    const existingUser = await User.findOne(
      { where: { userName } },
      { attributes: ['userId', 'userName'] }
    );
    return existingUser;
  }

  async retrieveById(userId: number) {
    let existingUser = await User.findOne(
      { where: { userId } },
      { attributes: ['userId', 'userName'] }
    );
    return existingUser;
  }

  // async retrieveUsers(room?: string) {
  //   if (room) {
  //     const users = await User.findAll({
  //       attributes: ['userName'],
  //       where: { room, active: true },
  //       raw: true,
  //     });
  //     return users;
  //   }
  //   const users = await User.findAll({
  //     attributes: ['userName'],
  //     where: { active: true },
  //     raw: true,
  //   });
  //   return users;
  // }

  // async setUserActive(userName: string) {
  //   await User.update({ active: true }, { where: { userName } });
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

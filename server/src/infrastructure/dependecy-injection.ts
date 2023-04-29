import MysqlUserRepository from './repositories/MysqlUserRepository';
import MysqlMessageRepository from './repositories/MysqlMessageRepository';

function configUserRepository() {
  if (process.env.DB === 'mysql') return new MysqlUserRepository();
}

function configMessageRepository() {
  if (process.env.DB === 'mysql') return new MysqlMessageRepository();
}

export const userRepository = configUserRepository();
export const messageRepository = configMessageRepository();
import Sequelize, { DataTypes } from 'sequelize';
import mysqlConfig from '../db/configMysql';

import _Users from './Users';
import _Messages from './Messages';

import { designDB } from '../db/createMysqldb';

const sequelize = new Sequelize(mysqlConfig.name, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  dialect: 'mysql',
  define: { freezeTableName: true },
  logging: false,
});

function initModels(sequelize) {
  const Users = _Users(sequelize, DataTypes);
  const Messages = _Messages(sequelize, DataTypes);
  Users.hasMany(Messages, { foreignKey: 'UserId' });
  return {
    Users,
    Messages,
  };
}

const { Users, Messages } = initModels(sequelize);

const initDB = async () => {
  try {
    await designDB();
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Mysql DB successfully connected.');
  } catch (error) {
    console.log(error.message);
    console.log('There was an error connecting with the database');
    process.exit(1);
  }
};

export { Users, Messages, initDB as default };

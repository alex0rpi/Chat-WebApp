import { createConnection } from 'mysql2/promise';
import mysqlConfig from './configMysql';

export async function designDB() {
  try {
    const dbcnx = await createConnection({
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      user: mysqlConfig.user,
      password: mysqlConfig.password,
    });
    await dbcnx.query(`CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.name}\``);
    console.log('Database created');
  } catch (error) {
    console.log('Error connecting o creating database' + error.message);
  }
}

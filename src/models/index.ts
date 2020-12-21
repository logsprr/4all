import { Sequelize } from 'sequelize';
import config from '../config/config';

const database = new Sequelize({
    database: config['development'].database,
    password: config['development'].password,
    username: config['development'].username,
    host: config['development'].host,
    operatorsAliases: config['development'].operatorsAliases,
    dialect: 'mysql'
});
export default database;
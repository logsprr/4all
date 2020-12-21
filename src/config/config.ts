const Sequelize = require("sequelize");

const config = {
    ["development"]: {
        username: "root",
        password: "12345678",
        database: "4allchalenge",
        host: "127.0.0.1",
        operatorsAliases: Sequelize.Op,
        dialect: "mysql"
    }
};
export default config;
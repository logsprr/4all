import { DataTypes, Model } from 'sequelize';
import database from '../models/index';
import { User_Have_Movie } from './User_have_Movie';


export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
    },
    {
        tableName: "Users",
        sequelize: database,
    }
);

User.hasMany(User_Have_Movie, {
    sourceKey: "id",
    foreignKey: "user_id",
    as: "user_id",
});

User.sync({ force: false }).then(() => console.log("Tabela Criada ou Atualizada (Usuários)"));
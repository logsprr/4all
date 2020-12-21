import { DataTypes, Model } from 'sequelize';
import database from '../models/index';


export class User_Have_Movie extends Model {
    public id!: number;
    public user_id!: number;
    public movie_id!: number;
}

User_Have_Movie.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        movie_id: {
            type: DataTypes.INTEGER.UNSIGNED
        },
    },
    {
        tableName: "Users_Have_Movies",
        sequelize: database,
    }
);

User_Have_Movie.sync({ force: false }).then(() => console.log("Tabela Criada ou Atualizada (Usuários tem Filmes)"));
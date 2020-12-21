import { DataTypes, Model } from 'sequelize';
import database from '../models/index';
import { User_Have_Movie } from './User_have_Movie';


export class Movie extends Model {
    public id!: number;
    public title!: string;
    public director!: string;
    public avaliableCopies!: number;
}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        director: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        avaliableCopies: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    },
    {
        tableName: "Movies",
        sequelize: database,
    }
);

Movie.hasMany(User_Have_Movie, {
    sourceKey: "id",
    foreignKey: "movie_id",
    as: "movie_id",
});

Movie.sync({ force: false }).then(() => console.log("Tabela Criada ou Atualizada (Filmes)"));
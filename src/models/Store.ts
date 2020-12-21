import { DataTypes, Model } from 'sequelize';
import database from '../models/index';


export class Store extends Model {
    public id!: number;
    public user_id!: number;
    public name!: string;
}

Store.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    },
    {
        tableName: "Stores",
        sequelize: database,
    }
);

Store.sync({ force: false }).then(() => console.log("Tabela Criada ou Atualizada (Locadoras)"));
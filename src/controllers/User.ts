import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../models/User';
import { Sequelize, Op } from 'sequelize';

export class UserController {
    constructor() {
    }

    async save(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { name, email, password } = req.body;
            if (name != null && email != null && password != null) {
                const hash = bcrypt.hashSync(password, 10);
                const user = await User.create({
                    name: name,
                    email: email,
                    password: hash
                });
                console.log(user);
                if (user != null) {
                    return res.status(200).json({
                        "success": true,
                        "error": null,
                        "user": user

                    })
                } else {
                    return res.status(500).json({
                        "success": false,
                        "error": "Não foi possivel atender a solicitação"

                    })
                }
            } else {
                return res.status(400).json({
                    "success": false,
                    "error": "Faltam parametros"

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": err

            })
        }

    }

    async getAll(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const users = await User.findAll();
            if (users.length > 0) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "users": users

                })
            } else {
                return res.status(200).json({
                    "success": true,
                    "error": "Não existem usuários",
                    "users": null

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }

    }

    async getByKey(req: Request, res: Response): Promise<Response | undefined> {
        const { key } = req.params;
        console.log(key)
        try {
            const users = await User.findAll({
                where: { name: { [Op.like]: "%" + key + "%" } }
            })
            if (users.length != 0) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "users": users

                })
            } else {
                return res.status(200).json({
                    "success": true,
                    "error": "O usuário não existe",
                    "user": null

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }
    }

    async getById(req: Request, res: Response): Promise<Response | undefined> {
        const { id } = req.params;
        try {
            const user = await User.findOne({ where: { id: id } })
            if (user != null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "users": user

                })
            } else {
                return res.status(200).json({
                    "success": true,
                    "error": "O usuário não existe",
                    "users": null

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }

    }

    async updateById(req: Request, res: Response): Promise<Response | undefined> {
        const { id } = req.params;
        try {
            const user = await User.update(req.body, { where: { id: id } })
            if (user.length > 0) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "users": user

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "Faltam parametros",
                    "users": null

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response | undefined> {
        const { id } = req.params;
        try {
            const user = await User.destroy({ where: { id: id } })
            if (user == null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "users": user

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "Faltam parametros",
                    "users": null

                })
            }
        } catch (err) {
            return res.status(200).json({
                "success": false,
                "error": "Aplicação fora do ar"
            })
        }
    }
}
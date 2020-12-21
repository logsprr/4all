import { Request, Response } from 'express';
import { Store } from '../models/Store';
export class StoreController {

    constructor() {
    }

    async save(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { user_id, name } = req.body;
            if (name != null && user_id != null) {
                const store = await Store.create({
                    name: name,
                    user_id: user_id
                });
                if (store != null) {
                    return res.status(200).json({
                        "success": true,
                        "error": null,
                        "store": store

                    })
                } else {
                    return res.status(400).json({
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
                "error": "Aplicação fora do ar"

            })
        }

    }

    async getAll(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const stores = await Store.findAll();
            if (stores.length > 0) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "stores": stores

                })
            } else {
                return res.status(200).json({
                    "success": true,
                    "error": "Não existem locadoras",
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

    async getById(req: Request, res: Response): Promise<Response | undefined> {
        const { id } = req.params;
        try {
            const store = await Store.findOne({ where: { id: id } })
            if (store != null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "store": store

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "A locadora não existe",
                    "store": null

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
            const store = await Store.update(req.body, { where: { id: id } })
            if (store != null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "store": store

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "Faltam parametros",
                    "store": null

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
            const store = await Store.destroy({ where: { id: id } })
            if (store == null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "store": store

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "Faltam parametros",
                    "store": null

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }
    }
}
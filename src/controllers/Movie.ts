import { Request, Response } from 'express';
import { Movie } from '../models/Movie';
import { Op } from 'sequelize';
import { User_Have_Movie } from '../models/User_have_Movie';
export class MovieController {

    constructor() {
    }

    async save(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { title, director, avaliableCopies } = req.body;
            if (title != null && director != null && avaliableCopies != null) {
                const movie = await Movie.create({
                    title: title,
                    director: director,
                    avaliableCopies: avaliableCopies
                });
                if (movie != null) {
                    return res.status(200).json({
                        "success": true,
                        "error": null,
                        "movie": movie

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
                "error": "Aplicação fora do ar",
                "err": err

            })
        }

    }

    async getAll(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const movies = await Movie.findAll();
            if (movies.length > 0) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "movies": movies

                })
            } else {
                return res.status(200).json({
                    "success": true,
                    "error": "Não existem filmes",
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
        try {
            const movies = await Movie.findAll({
                where: { title: { [Op.like]: "%" + key + "%" } }
            })
            if (movies.length > 0) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "movies": movies

                })
            } else {
                return res.status(200).json({
                    "success": true,
                    "error": "O usuário não existe",
                    "movie": null

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
            const movie = await Movie.findOne({ where: { id: id } })
            if (movie != null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "movie": movie

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "O filme não existe",
                    "movie": null

                })
            }
        } catch (err) {
            return res.status(400).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }

    }

    async updateById(req: Request, res: Response): Promise<Response | undefined> {
        const { id } = req.params;
        try {
            const movie = await Movie.update(req.body, { where: { id: id } })
            if (movie != null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "movie": movie

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "Faltam parametros",
                    "movie": null

                })
            }
        } catch (err) {
            return res.status(400).json({
                "success": false,
                "error": "Aplicação fora do ar",

            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response | undefined> {
        const { id } = req.params;
        try {
            const movie = await Movie.destroy({ where: { id: id } })
            if (movie == null) {
                return res.status(200).json({
                    "success": true,
                    "error": null,
                    "movie": movie

                })
            } else {
                return res.status(400).json({
                    "success": true,
                    "error": "Faltam parametros",
                    "movie": null

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }
    }

    async getRent(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { user_id, movie_id } = req.body;
            console.log(user_id, movie_id)
            const movie = await Movie.findOne({ where: { id: movie_id } })
            if (movie != null) {
                if (movie.avaliableCopies > 0) {
                    const user_have_movie = await User_Have_Movie.create({
                        user_id: user_id,
                        movie_id: movie_id
                    })
                    console.log(user_have_movie)
                    if (user_have_movie != null) {
                        movie.update({ avaliableCopies: movie.avaliableCopies - 1 })
                        return res.status(200).json({
                            "success": true,
                            "error": null,
                            "movie": movie

                        })
                    } else {
                        return res.status(400).json({
                            "success": true,
                            "error": "Não foi possivel atender a solicitação",
                            "movie": null

                        })
                    }
                } else {
                    return res.status(400).json({
                        "success": true,
                        "error": " Não é possível alugar este filme, cópias insuficientes",
                        "movie": null

                    })
                }
            } return res.status(400).json({
                "success": true,
                "error": "O filme não existe",
                "movie": null

            })
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }
    }

    async deleteRent(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { user_id, movie_id } = req.body;
            const movie = await Movie.findOne({ where: { id: movie_id } })
            if (movie != null) {
                const user_have_movie = await User_Have_Movie.destroy({ where: { user_id: user_id, movie_id: movie_id } })
                if (user_have_movie != null) {
                    movie.update({ avaliableCopies: movie.avaliableCopies + 1 })
                    return res.status(200).json({
                        "success": true,
                        "error": null
                    })
                } else {
                    return res.status(400).json({
                        "success": true,
                        "error": "Não foi possivel atender a solicitação",
                        "movie": null

                    })
                }
            } return res.status(400).json({
                "success": true,
                "error": "O filme não existe",
                "movie": null

            })
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": "Aplicação fora do ar"

            })
        }
    }
}
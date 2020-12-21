
import jwt from 'jsonwebtoken';
export class Token {
    constructor() { }

    async generateToken(params: number): Promise<string> {
        const token = await jwt.sign({ id: params }, String(process.env.KEY4ALL), {
            expiresIn: 86400
        })
        return token;
    };
    async verifyToken(params: string): Promise<string | object> {
        const token = await jwt.verify(params, String(process.env.KEY4ALL));
        return token;
    }
}
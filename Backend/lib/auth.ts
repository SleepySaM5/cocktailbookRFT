import * as jwt from  "jsonwebtoken";
import {Request, Response} from "express";
import {User} from "./controller/userController";
import { jwtSecret } from "../../config/constants";

export class AuthService {
    createToken(auth): any {
        return jwt.sign({id: auth.id}, jwtSecret, {expiresIn: 60 * 120});
    }

    generateToken(req: Request, res: Response, next: Function): void {
        console.log('On generate token: ');
        req['token'] = this.createToken(req['auth']);
        console.log('req token: ', req['token']);
        next();
    };

    sendToken(req: Request, res: Response): void {
        res.set('x-auth-token', req['token']);
        res.status(200).json(req['auth']);
    };

    authenticate(req: Request, res: Response, next: Function): void {
        console.log('Authenticating request to ', req.url);
        jwt.verify(req.headers['x-auth-token'], jwtSecret, (err, decoded) => {
            if (err) {
                console.log('Error: Unauthenticated: ');
                res.status(401).send('Unauthenticated!');
            } else {
                console.log('Successfully authenticated request!');
                req['auth'] = decoded;
                next();
            }
        });
    }

    getCurrentUser(req, res, next) : any{
        console.log('Finding current user on request', req.url);
        console.log('Request auth-id ', req.auth.id);
        User.findById(req.auth.id, (err, user) => {
            if (err) {
                console.log('An error happened: ', err);
                next(err);
            } else {
                req.user = user;
                console.log('Found the user: ', req.user);
                next();
            }
        });
    }

    getOne(req: Request, res: Response) {
        let user = req['user'];
        if (user){
            delete user['facebookProvider'];
            delete user['__v'];
        }
        res.json(user);
    };

}

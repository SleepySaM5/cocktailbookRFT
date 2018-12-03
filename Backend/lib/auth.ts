import * as jwt from  "jsonwebtoken";
import * as expressJwt from  "express-jwt";
import {jwtSecret} from "../config/constants";
import {User} from "./controller/userController";

export class AuthService {
    createToken(auth): any {
        return jwt.sign({
                id: auth.id
            }, jwtSecret,
            {
                expiresIn: 60 * 120
            });
    }

    generateToken(req, res, next): void {
        req.token = this.createToken(req.auth);
        next();
    };

    sendToken(req, res): void {
        res.setHeader('x-auth-token', req.token);
        res.status(200).send(req.auth);
    };

    authenticate = expressJwt({
        secret: jwtSecret,
        requestProperty: 'auth',
        getToken: (req) => {
            if (req.headers['x-auth-token']) {
                return req.headers['x-auth-token'];
            }
            return null;
        }
    });

    getCurrentUser(req, res, next) : any{
        return User.findById(req.auth.id, function (err, user) {
            if (err) {
                next(err);
            } else {
                req.user = user;
                next();
            }
        });
    }

    getOne(req, res) {
        let user = req.user.toObject();

        delete user['facebookProvider'];
        delete user['__v'];

        res.json(user);
    };

}

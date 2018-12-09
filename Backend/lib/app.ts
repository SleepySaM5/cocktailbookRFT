import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as passport from 'passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import {clientID, clientSecret} from "../config/constants";
import {UserController} from "./controller/userController";
import * as cors from "cors";

class App{

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/CRMdb';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        let corsOption = {
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            exposedHeaders: ['x-auth-token']
        };
        this.app.use(cors(corsOption));
        this.authSetup();
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private authSetup(): void {
        passport.use(new FacebookTokenStrategy({
            clientID: clientID,
            clientSecret: clientSecret,
    },
        (accessToken, refreshToken, profile, done) => {
            let userController = new UserController();
            userController.upsertFbUser(accessToken, refreshToken, profile, done);
        }));
    }
}

export default new App().app;

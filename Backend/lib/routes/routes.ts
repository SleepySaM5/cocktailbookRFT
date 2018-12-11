import {Application, Request, Response} from "express";
import {CocktailController} from "../controller/cocktailController";
import * as passport from 'passport';
import {AuthService} from "../auth";
import {UserActionController} from "../controller/userActionController";

export class Routes {
    private cocktailController: CocktailController;
    private authService: AuthService;
    private userActionController: UserActionController;

    constructor() {
        this.cocktailController = new CocktailController();
        this.authService = new AuthService();
        this.userActionController = new UserActionController();
    }

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            });
        app.route('/cocktail')
            .post(this.cocktailController.addNewCocktail);
        app.route('/cocktail')
            .get(this.cocktailController.getCocktails);
        app.route('/cocktail/filter')
            .get(this.cocktailController.filterCocktails);
        app.route('/cocktail/:cocktailID')
            .get(this.cocktailController.getCocktailWithID)
            .put(this.cocktailController.updateCocktail)
            .delete(this.cocktailController.deleteCocktail);

        app.route('/auth/facebook')
            .post(passport.authenticate('facebook-token', {session: false}),
                (req: Request, res: Response, next: Function) => {
                    if (!req['user']) {
                        return res.status(401).send('User Not Authenticated');
                    }
                    req['auth'] = {
                        id: req['user'].id
                    };

                    next();
                }, (req: Request, res: Response, next: Function) => {
                    this.authService.generateToken(req, res, next)
                },
                (req: Request, res: Response) => this.authService.sendToken(req, res));
        app.route('/auth/me')
            .get(this.authService.authenticate,
                (req: Request, res: Response, next: Function) => this.authService.getCurrentUser(req, res, next),
                (req: Request, res: Response) => this.authService.getOne(req, res));

        app.route('/user/:userID/favourites')
            .get(this.userActionController.getFavourites);
        app.route('/user/:userID/favourites/:cocktailID')
            .post(this.userActionController.addCocktailToFavorites)
            .delete(this.userActionController.deleteFavourite);
    }
}



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
        app.route('*').all((req: Request, res: Response, next: Function) => {
            console.log('Request happened: ', req.url);
            next()
        });
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfully!'
                })
            });
        app.route('/cocktail')
            .post(this.cocktailController.addNewCocktail);
        app.route('/cocktail')
            .get(this.cocktailController.getCocktails);
        app.route('/cocktail/filter')
            .get(this.cocktailController.filterCocktails);
        app.route('/cocktail/:id')
            .get(this.cocktailController.getCocktailWithID)
            .put(this.cocktailController.updateCocktail)
            .delete(this.cocktailController.deleteCocktail);
        app.route('/favourites')
            .get(this.authService.authenticate,
                (req: Request, res: Response, next: Function) => this.authService.getCurrentUser(req, res, next),
                this.userActionController.getFavourites);
        app.route('/favourites/:id')

            .post(this.authService.authenticate,
                this.authService.getCurrentUser,
                this.userActionController.addCocktailToFavorites)
            .delete(this.authService.authenticate,
                this.authService.getCurrentUser,
                this.userActionController.deleteFavourite);
        app.route('/comment')
            .post(this.authService.authenticate,
                this.authService.getCurrentUser,
                this.userActionController.submitComment);
        app.route('/comments')
            .get(this.authService.authenticate,
                this.authService.getCurrentUser,
                this.userActionController.getComments);
        app.route('/auth/facebook')
            .post(passport.authenticate('facebook-token', {session: false}),
                (req: Request, res: Response, next: Function) => {
                    if (!req['user']) {
                        res.status(401).send('User Not Authenticated');
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

    }
}



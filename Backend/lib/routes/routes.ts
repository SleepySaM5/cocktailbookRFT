import {Request, Response} from "express";
import { CocktailController } from "../controller/cocktailController";
import * as passport from 'passport';
import {AuthService} from "../auth";

export class Routes {

    public cocktailController: CocktailController = new CocktailController();
    public authService = new AuthService();

    public routes(app): void {
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
            .get(this.cocktailController.filterCocktails)
        app.route('/cocktail/:cocktailID')
            .get(this.cocktailController.getCocktailWithID)
            .put(this.cocktailController.updateCocktail)
            .delete(this.cocktailController.deleteCocktail)

        app.route('/auth/facebook')
            .post(passport.authenticate('facebook-token', {session: false}),(req, res, next) => {
                if (!req.user) {
                    return res.send(401, 'User Not Authenticated');
                }
                req.auth = {
                    id: req.user.id
                };

                next();
            }, this.authService.generateToken, this.authService.sendToken);
        app.route('/auth/me')
            .get(this.authService.authenticate, this.authService.getCurrentUser, this.authService.getOne);

    }
}



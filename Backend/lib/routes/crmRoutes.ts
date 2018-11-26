import {Request, Response} from "express";
import { CocktailController } from "../controller/crmController";

export class Routes {

    public cocktailController: CocktailController = new CocktailController();


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

    }
}



import * as mongoose from 'mongoose';
import { CocktailSchema } from '../model/cocktailModel';
import { Request, Response } from 'express';

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export class CocktailController {

    public addNewCocktail (req: Request, res: Response) {
        let newCocktail = new Cocktail(req.body);

        newCocktail.save((err, cocktail) => {
            if(err){
                res.send(err);
            }
            res.json(cocktail);
        });
    }

    public getCocktails (req: Request, res: Response) {
        Cocktail.find({}, (err, cocktail) => {
            if(err){
                res.send(err);
            }
            res.json(cocktail);
        });
    }

    public getCocktailWithID (req: Request, res: Response) {
        console.log("asd");
        Cocktail.findById(req.params.cocktailID, (err, cocktail) => {
            if(err){
                res.send(err);
            }
            res.json(cocktail);
        });
    }
    public updateCocktail (req: Request, res: Response) {
        Cocktail.findOneAndUpdate({ _id: req.params.cocktailID }, req.body, { new: true }, (err, cocktail) => {
            if(err){
                res.send(err);
            }
            res.json(cocktail);
        });
    }
    public deleteCocktail (req: Request, res: Response) {
        Cocktail.remove({ _id: req.params.cocktailID }, (err, cocktail) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted cocktail!'});
        });


    }
    public filterCocktails (req: Request, res: Response) {
        console.log("filtering : ", req.query);
        if(req.query && req.query.ingredients){
            let ingredients = req.query.ingredients.split(',').map((ingredient) => (ingredient.trim()));
            console.log("ingredients: ", ingredients);
            Cocktail.find({ ingredientList:{$all:ingredients}}, (err, cocktail) =>{
                if(err){
                    res.send(err);
                }
                res.json(cocktail);
            })
        }
    }
}
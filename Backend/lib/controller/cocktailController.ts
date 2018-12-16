import * as mongoose from 'mongoose';
import {CocktailSchema} from '../model/cocktailModel';
import {Request, Response} from 'express';

export const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export class CocktailController {

    public addNewCocktail(req: Request, res: Response) {
        console.log(`Adding new cocktail with params: ${JSON.stringify(req.body)}.`);
        let newCocktail = new Cocktail(req.body);

        newCocktail.save((err, cocktail) => {
            console.log('Saving the cocktail: ', cocktail);
            if (err) {
                res.send(err);
            }
            res.json(cocktail);
        });
    }

    public getCocktails(req: Request, res: Response) {
        console.log(`Getting all cocktails.`);
        Cocktail.find({}, (err, cocktail) => {
            if (err) {
                res.send(err);
            }
            res.json(cocktail);
        });
    }

    public getCocktailWithID(req: Request, res: Response) {
        console.log(`Getting cocktail with id: ${req.params.id}.`);
        Cocktail.findById(req.params.id, (err, cocktail) => {
            if (err) {
                res.send(err);
            }
            res.json(cocktail);
        });
    }

    public updateCocktail(req: Request, res: Response) {
        Cocktail.findOneAndUpdate({_id: req.params.cocktailID}, req.body, {new: true},
            (err, cocktail) => {
                if (err) {
                    res.send(err);
                }
                res.json(cocktail);
            });
    }

    public deleteCocktail(req: Request, res: Response) {
        Cocktail.remove({_id: req.params.cocktailID}, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Successfully deleted cocktail!'});
        });
    }

    public filterCocktails(req: Request, res: Response) {
        console.log("Finding all cocktails by filter : ", req.query);
        if (req.query && req.query.ingredients) {
            let ingredients = req.query.ingredients.split(',').map((ingredient) => (ingredient.trim()));
            Cocktail.find({ingredientList: {$all: ingredients}}, (err, cocktail) => {
                if (err) {
                    console.log('Error while looking for cocktails with ingredients: ', ingredients);
                    res.send(err);
                }
                res.json(cocktail);
            })
        }
    }
}
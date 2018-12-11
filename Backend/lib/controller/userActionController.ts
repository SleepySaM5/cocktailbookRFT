import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { FavouriteModel, FavouriteSchema } from "../model/favouriteModel";
import { Cocktail } from "./cocktailController";
import { CocktailModel } from "../model/cocktailModel";

export const Favourite = mongoose.model('Favourite', FavouriteSchema);

export class UserActionController {
    public getFavourites(req: Request, res: Response) {
        console.log('Getting favourites: ');
        Favourite.findOne({userId: req.params.userID}, (err, favourite: FavouriteModel) => {
            if (err) {
                res.send(err);
            }

            console.log('Found the  favourite: ,', favourite);

            if (!favourite) {
                res.json([]);
            } else {
                res.json(favourite.cocktailList);
            }
        })
    }

    public async addCocktailToFavorites(req: Request, res: Response) {
        let options = {upsert: true};
        let cocktailId = req.params.cocktailID;
        let userId = req.params.userID;
        let cocktailToAdd: CocktailModel;

        await Cocktail.findById(req.params.cocktailID, (err, cocktail: CocktailModel) => {
            if (err || !cocktail) {

                console.error(`No cocktail with id: ${cocktailId} found!`);
                res.send(err);
                return;
            }
            cocktailToAdd = cocktail;
        });

        console.log('Found cocktail to add: ', cocktailToAdd);
        Favourite.findOne({userId: userId}, (err, favourite:any) => {
            console.log('Found one favourite: ', favourite);
            if (err) {
                console.error(`Error on finding favourite for userId: ${userId}.`);
                res.send(err);
            }

            if (!favourite) {
                console.log(`Favourite for userId: ${userId} didn't exist yet, initializing.`);
                favourite = new Favourite({userId: userId, cocktailList: [cocktailToAdd]});

            } else {
                console.log(`Favourite for userId: ${userId} existed, adding cocktail: ${cocktailToAdd.cocktailName}`);
                console.log(`index of is ${cocktailToAdd.cocktailName}: `, favourite.cocktailList.indexOf(cocktailToAdd));
                //todo check by reference
                if (favourite.cocktailList.indexOf(cocktailToAdd) === -1 ) {
                    favourite.cocktailList.push(cocktailToAdd);
                } else {
                    console.log('Apparently was included? ', favourite.cocktailList);
                }
                console.log('Favourite existed, cocktail list is now: ', favourite.cocktailList);
            }

            console.log('Saving favourite like: ', favourite);
            favourite.save((error, savedFavourite) => {
                console.log('Saving: ', savedFavourite);
                if (error) {
                    console.error(error);
                    res.send('Error while saving favourites!');
                }
                res.json(savedFavourite);
            });
        });
    }


    public deleteFavourite(req: Request, res: Response) {
        let options = {upsert: true, new: true};
        let cocktailId = req.params.cocktailID;
        let userId = req.params.userID;
        console.log(`Deleting favourite cocktail with id ${cocktailId} on ${userId}`);

        Favourite.findOne({userId: userId}, options, (err, favourite:any) => {
            if (err) {
                res.send(err);
            }
            console.log('Found one favourite: ', favourite);

            if (!favourite) {
                console.log(`Favourite for userId: ${userId} didn't exist yet, initializing.`);
                favourite = new Favourite({userId: userId, cocktailList: []});
            } else if (favourite.cocktailList) {
                console.log(`Favourite for userId: ${userId} existed, removing cocktail: ${cocktailId}`);
                console.log(`Favourite for userId: ${userId} existed: favourite`);
                favourite.cocktailList = favourite.cocktailList.filter((cocktail) => cocktail.id !== cocktailId);
                console.log('Filtered cocktail list is: ', favourite.cocktailList);
            }

            favourite.save((error) => {
                if (error) {
                    console.log(`Error while saving favourite for ${userId}`);
                    console.error(error);
                    res.send('Error while saving favourites!');
                }
                res.json(favourite);

            });
        });
    }
}
import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { FavouriteModel, FavouriteSchema } from "../model/favouriteModel";
import { Cocktail } from "./cocktailController";
import { CocktailModel } from "../model/cocktailModel";

export const Favourite = mongoose.model('Favourite', FavouriteSchema);

export class UserActionController {
    public getFavourites(req: Request, res: Response) {
        let user = req['user'];
        console.log('Getting favourites for user', req['user']);
        if (!user) {
            res.send('No such user');
        } else {
            Favourite.findOne({userId: user['_id']}, (err, favourite: any) => {
                if (err) {
                    res.send(err);
                }

                console.log('Found the  favourite: ', favourite);
                if (!favourite) {
                    res.json([]);
                } else {
                    res.json(favourite.cocktailList);
                }
            })
        }
    }

    public async addCocktailToFavorites(req: Request, res: Response) {
        let options = {upsert: true};
        let cocktailId = req.params.id;
        let user = req['user'];
        let userId = user['_id'];
        let cocktailToAdd: CocktailModel;

        console.log('Adding cocktail to favourites user:', user);

        if (!cocktailId) {
            res.status(404).send('No cocktailId!');
        } else {

            await Cocktail.findById(cocktailId, (err, cocktail: CocktailModel) => {
                if (err || !cocktail) {

                    console.error(`No cocktail with id: ${cocktailId} found!`);
                    res.send(err);
                    return;
                } else {
                    console.log('cocktailToAdd = ', cocktail);
                    cocktailToAdd = cocktail;
                }
            });

            console.log('Found cocktail to add: ', cocktailToAdd);
            if (!cocktailToAdd) {
                res.send('No such cocktail found!');
                return
            }
            Favourite.findOne({userId: userId}, (err, favourite: any) => {
                console.log('Found one favourite: ', favourite);
                if (err) {
                    console.error(`Error on finding favourite for userId: ${userId}.`);
                    res.send(err);
                    return;
                }
                if (!favourite) {
                    favourite = new Favourite({userId: userId, cocktailList: [cocktailToAdd]});

                } else {
                    if (!favourite.cocktailList.find((cocktail) => cocktail.id === cocktailToAdd.id)) {
                        favourite.cocktailList.push(cocktailToAdd);
                    }
                }
                favourite.save((error, savedFavourite) => {
                    if (error) {
                        console.error(error);
                        res.send('Error while saving favourites!');
                    } else {
                        res.json(savedFavourite);
                    }
                });
            });
        }
    }

    public deleteFavourite(req: Request, res: Response) {
        let options = {upsert: true, new: true};
        let cocktailId = req.params.id;
        let user = req['user'];
        let userId = user['_id'];
        console.log(`Deleting favourite cocktail with id ${cocktailId} on ${user}`);

        Favourite.findOne({userId: user['_id']}, (err, favourite: any) => {
            if (err) {
                res.send(err);
            }

            if (!favourite) {
                favourite = new Favourite({userId: userId, cocktailList: []});
            } else if (favourite.cocktailList) {
                favourite.cocktailList = favourite.cocktailList.filter((cocktail) => cocktail.id !== cocktailId);
            }

            favourite.save((error) => {
                if (error) {
                    console.log(`Error while saving favourite for ${userId}`);
                    console.error(error);
                    res.send('Error while saving favourites!');
                } else {
                    res.json(favourite);
                }
            });
        });
    }
}
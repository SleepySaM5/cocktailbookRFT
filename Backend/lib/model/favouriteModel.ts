import * as mongoose from 'mongoose';
import {CocktailModel, CocktailSchema} from "./cocktailModel";
const Schema = mongoose.Schema;

export const FavouriteSchema = new Schema({
    userId : {
        type: String,
        index: true,
        unique: true
    },
    cocktailList : {
        type : [CocktailSchema]
    }
});

export interface FavouriteModel {
    userId: string,
    cocktailList: CocktailModel[];
}
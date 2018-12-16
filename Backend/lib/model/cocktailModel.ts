import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CocktailSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a cocktail name!'
    },
    ingredientList: {
        type: [String]
    },
    description:{
      type : String
    },
    imgPath:{
        type : String
    },
    imgAlt:{
        type : String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

export interface CocktailModel {
    id: string;
    name: string;
    ingredientList: string[],
    description: string,
    createdDate: Date
}
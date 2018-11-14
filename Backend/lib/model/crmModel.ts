import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CocktailSchema = new Schema({
    cocktailName: {
        type: String,
        required: 'Enter a cocktail name'
    },
    ingredientList: {
        type: String
    },
    description:{
      type : String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
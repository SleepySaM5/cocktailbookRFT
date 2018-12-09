import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const IngredientSchema = new Schema({
    name: {
        type: String,
        required: 'Enter an ingredient name'
    },
    type: {
        type: String,
        enum:['spirit','liqueur','fruit','sweetener','bitter','herb','other']
    }
});

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
    content: {
        type : String,
        required: 'You can\'t enter and empty comment!'

    },
    cocktailID : {
      type : String
    },
    author : {
        type : String
    },
    date : {
        type : Date,
        default: Date.now
    }
});
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
});
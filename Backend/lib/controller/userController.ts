import * as mongoose from 'mongoose';
import { UserSchema } from '../model/userModel';

export const User = mongoose.model('User', UserSchema);

export class UserController {
    upsertFbUser(accessToken, refreshToken, profile, cb) {
        return User.findOne({
            'facebookProvider.id': profile.id
        }, (err, user) => {
            if (!user) {
                let newUser = new UserSchema({
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save((error, savedUser) => {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };
}
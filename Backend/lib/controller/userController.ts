import * as mongoose from 'mongoose';
import { UserSchema } from '../model/userModel';

export const User = mongoose.model('User', UserSchema);

export class UserController {
    upsertFbUser(accessToken, refreshToken, profile, cb) {
        console.log('UserController upserting user: ', accessToken);

        return User.findOne({
                'facebookProvider.id': profile.id
        }, (err, user) => {
            if (!user) {
                console.log('No such user, making one! ', profile);
                let newUser = new User({
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });
                newUser.save((error, savedUser) => {
                    console.log('On save: ', savedUser);
                    if (error) {
                        console.error(error);
                    }
                    return cb(error, savedUser);
                });
                console.log('User saved.');
            } else {
                console.log('Was a user already.');
                return cb(err, user);
            }
        });
    };
}
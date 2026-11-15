
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./env.js";

import {
    getUserByGoogleId,
    getUserByEmail,
    createGoogleUser
} from "../repositories/userRepository.js";

const {
    googleClientId,
    googleClientSecret,
    googleCallbackUrl
} = env;

if (googleClientId && googleClientSecret) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: googleClientId,
                clientSecret: googleClientSecret,
                callbackURL: googleCallbackUrl
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    // 1. Check whether this Google account already exists
                    const existingGoogleUser = await getUserByGoogleId(profile.id);

                    if (existingGoogleUser) {
                        const { passwordHash: _, ...safeUser } =
                            existingGoogleUser.toObject();

                        return done(null, safeUser);
                    }

                    // 2. Only accept verified Google email addresses
                    const verifiedEmail = profile.emails?.find(
                        email => email.verified === true
                    );

                    if (!verifiedEmail?.value) {
                        return done(null, false, {
                            message: "Google account must have a verified email"
                        });
                    }

                    const email = verifiedEmail.value.trim().toLowerCase();

                    // 3. Prevent automatic account linking
                    const existingEmailUser = await getUserByEmail(email);

                    if (existingEmailUser) {
                        return done(null, false, {
                            message: "An account with this email already exists. Please log in using your existing login method."
                        });
                    }

                    // 4. Create a new Google user
                    const newUser = await createGoogleUser({
                        name: profile.displayName,
                        email,
                        googleId: profile.id
                    });

                    const { passwordHash: _, ...safeUser } =
                        newUser.toObject();

                    return done(null, safeUser);

                } catch (error) {
                    return done(error as Error);
                }
            }
        )
    );
} else {
    console.warn(
        "Google sign-in disabled: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are not set"
    );
}

export default passport;

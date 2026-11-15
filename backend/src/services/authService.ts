import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { createUser, getUserByEmail, getPublicUserById } from '../repositories/userRepository.js';
import { AppError, StatusCode } from '../utils/AppError.js';


export async function registerUser(
    name: string,
    email: string,
    password: string
) {
  
   const normalizedEmail = email.trim().toLowerCase();
   const existingUser = await getUserByEmail(normalizedEmail);

    if (existingUser) {
        throw new AppError('User already exists', StatusCode.CONFLICT);
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ name, email: normalizedEmail, passwordHash });

    // Remove the password hash before returning the user object
    const { passwordHash: _, ...safeUser } = user.toObject();

    return safeUser;
}

export async function loginUser(email: string, password: string) {
   const normalizedEmail = email.trim().toLowerCase();
   const existingUser = await getUserByEmail(normalizedEmail);
   if (!existingUser) {
       throw new AppError('Invalid email or password', StatusCode.UNAUTHORIZED);
   }

   // For Google, Facebook and Microsoft OAuth users, passwordHash may not exist
   if (!existingUser.passwordHash) {
    throw new AppError(
        'Invalid email or password',
        StatusCode.UNAUTHORIZED
     );
   }

   // Verify the password
   const isPasswordValid = await comparePassword(password, existingUser.passwordHash??'');
   if (!isPasswordValid) {
       throw new AppError('Invalid email or password', StatusCode.UNAUTHORIZED);
   }

   // Remove the password hash before returning the user object
   const { passwordHash: _, ...safeUser } = existingUser.toObject();

   return safeUser;
}

// The logged-in user's profile. 404 if the account was deleted
// after the token was issued (the token itself is still valid).
export async function getCurrentUser(userId: string) {
    const user = await getPublicUserById(userId);

    if (!user) {
        throw new AppError('User not found', StatusCode.NOT_FOUND);
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email
    };
}
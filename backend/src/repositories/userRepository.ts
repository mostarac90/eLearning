
import { User } from "../models/userModel.js";

export type CreateUserInput = {
    name: string;
    email: string;
    passwordHash?: string;
};


export async function getAllUsers() {
    return User.find();
}       

export async function createUser(userData: CreateUserInput) {
     return  User.create(userData);
}

export async function getUserByEmail(userEmail: string) {
     return  User.findOne({ email: userEmail });
}

// Public profile only: _id is always included, everything else
// (passwordHash, googleId, timestamps) stays in the database
export async function getPublicUserById(userId: string) {
    return User.findById(userId).select("name email").lean();
}

export async function deleteUser(userId: string) {
    return  User.findByIdAndDelete(userId);
}

export async function updateUser(userId: string, userData: CreateUserInput) {
    return  User.findByIdAndUpdate(userId, userData, { new: true });
}

export async function getUserByGoogleId(googleId: string) {
    return User.findOne({ googleId });
};

export async function createGoogleUser(userData: {
    name: string;
    email: string;
    googleId: string;
}) {
    return User.create(userData);
}

export async function linkGoogleAccount(userId: string, googleId: string) {
    return User.findByIdAndUpdate(userId, { googleId }, { new: true });
}
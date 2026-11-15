import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        passwordHash: {
            type: String,
            required: false
        },
        googleId: {
            type: String,
            required: false
        },
        facebookId: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.index(
    { googleId: 1 },
    {
        unique: true,
        partialFilterExpression: {
            googleId: { $type: "string" }
        }
    }
);

export const User = mongoose.model("User", userSchema);
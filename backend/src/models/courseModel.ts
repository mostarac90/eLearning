import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        }
    },
    {
        timestamps: true
    }
);

export const Course = mongoose.model("Course", courseSchema);
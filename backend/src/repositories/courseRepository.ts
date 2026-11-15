
import { Course } from "../models/courseModel.js";


export type CreateCourseInput = {
    title: string;
    description: string;
    status?: "draft" | "published";
};


export async function getPaginatedCourses(page: number, limit: number) {
    const skip = (page - 1) * limit;
    
    const [total, courses] = await Promise.all([
        Course.countDocuments(),
        Course.find().skip(skip).limit(limit)
    ]);

    return { total, courses };

}

export async function getAllCourses() {
    return Course.find();
}       

export async function createCourse(courseData: CreateCourseInput) {
     return  Course.create(courseData);
}

export async function getCourseById(courseId: string) {
     return  Course.findById(courseId);
}

export async function deleteCourse(courseId: string) {
    return  Course.findByIdAndDelete(courseId);
}

export async function updateCourse(courseId: string, courseData: CreateCourseInput) {
    return  Course.findByIdAndUpdate(courseId, courseData, { new: true });
}

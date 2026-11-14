
import * as courseRepository from "../repositories/courseRepository.js";
import type { CreateCourseInput } from "../repositories/courseRepository.js";

export async function getAllCourses() {
    return courseRepository.getAllCourses();
}

export async function createCourse(courseData: CreateCourseInput) { 

    let course = await courseRepository.createCourse(courseData);

    if(!course) {
        throw new Error("Failed to create course");
    }
    
    return course; 
}   

export async function getCourseById(courseId: string) {

    let course = await courseRepository.getCourseById(courseId);

    if(!course) {
        throw new Error("Course not found");
    }

    return course;
}

export async function deleteCourse(courseId: string) {
    let course = await courseRepository.getCourseById(courseId);

    if(!course) {
        throw new Error("Course not found");
    }

    return courseRepository.deleteCourse(courseId);
}

export async function updateCourse(courseId: string, courseData: CreateCourseInput) {
    let course = await courseRepository.getCourseById(courseId);

    if(!course) {
        throw new Error("Course not found");
    }

    return courseRepository.updateCourse(courseId, courseData);
}
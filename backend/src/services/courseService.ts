
import * as courseRepository from "../repositories/courseRepository.js";
import type { CreateCourseInput } from "../repositories/courseRepository.js";
import { AppError, StatusCode } from "../utils/AppError.js";

export async function getAllCourses() {
    return courseRepository.getAllCourses();
}

export async function getPaginatedCourses(page: number, limit: number){


    if(page <= 0) {
        throw new AppError("Page number must be greater than 0", StatusCode.BAD_REQUEST);
    }

    if(limit <= 0) {
        throw new AppError("Limit must be greater than 0", StatusCode.BAD_REQUEST);
    }

    const paginatedData = await courseRepository.getPaginatedCourses(page, limit);

    const totalPages = Math.ceil(paginatedData.total / limit);

    return {
        totalPages,
        courses: paginatedData.courses,
        currentPage: page,
        totalCourses: paginatedData.total
    };
}

export async function createCourse(courseData: CreateCourseInput) { 

    let course = await courseRepository.createCourse(courseData);

    if(!course) {
        throw new AppError("Failed to create course", StatusCode.INTERNAL_SERVER_ERROR);
    }

    return course; 
}   

export async function getCourseById(courseId: string) {

    let course = await courseRepository.getCourseById(courseId);

    if(!course) {
        throw new AppError("Course not found", StatusCode.NOT_FOUND);
    }

    return course;
}

export async function deleteCourse(courseId: string) {
    let course = await courseRepository.getCourseById(courseId);

    if(!course) {
        throw new AppError("Course not found", StatusCode.NOT_FOUND);
    }

    return courseRepository.deleteCourse(courseId);
}

export async function updateCourse(courseId: string, courseData: CreateCourseInput) {
    let course = await courseRepository.getCourseById(courseId);

    if(!course) {
        throw new AppError("Course not found", StatusCode.NOT_FOUND);
    }

    return courseRepository.updateCourse(courseId, courseData);
}
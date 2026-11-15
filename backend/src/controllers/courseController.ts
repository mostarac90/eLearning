import * as courseService from "../services/courseService.js";
import type { CreateCourseInput } from "../repositories/courseRepository.js";
import type { Request, Response, NextFunction } from "express";


export async function getPaginatedCourses(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const paginatedCourses = await courseService.getPaginatedCourses(page, limit);
        res.json(paginatedCourses);
    } catch (error) {
        next(error);
    }
}

export async function getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
        const courses = await courseService.getAllCourses();
        res.json(courses);
    } catch (error) {
        next(error);
    }
}

export async function createCourse(req: Request, res: Response, next: NextFunction) {
    try {
        const courseData: CreateCourseInput = req.body;
        const course = await courseService.createCourse(courseData);
        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
}

export async function getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
        const courseId = req.params.id;
        const course = await courseService.getCourseById(courseId);
        res.json(course);
    } catch (error) {
        next(error);
    }
}

export async function updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
        const courseId = req.params.id;
        const courseData: CreateCourseInput = req.body;
        const course = await courseService.updateCourse(courseId, courseData);
        res.json(course);
    } catch (error) {
        next(error);
    }
}

export async function deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
        const courseId = req.params.id;
        await courseService.deleteCourse(courseId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}   
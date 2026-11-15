import {Router } from "express";
import {
    getPaginatedCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from "../controllers/courseController.js";
const router = Router();

router.get("/", getPaginatedCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);


export default router;
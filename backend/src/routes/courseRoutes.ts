import {Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";


import {
    getPaginatedCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from "../controllers/courseController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getPaginatedCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
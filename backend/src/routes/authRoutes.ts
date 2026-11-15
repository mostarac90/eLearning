import {Router } from "express";
import { googleCallback } from "../controllers/authController.js";
import {
   register,
   login,
   logout,
   me
} from "../controllers/authController.js";
import passport from "../config/passport.js";
import { env } from "../config/env.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);


router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    })
);


router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        // Back to the frontend login page, which shows a Google error message
        failureRedirect: `${env.clientUrl}/login?error=google`
    }),
    googleCallback
);


export default router;
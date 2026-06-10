import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { googleLogin } from "../controllers/google.auth.controller.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get("/profile", authMiddleware, (req, res) => {
//     res.json(req.user);
//     res.json({
//         message : " profile page loaded"
//     })
// });
router.post("/google", googleLogin);

router.get("/", (req, res) => {
  res.json({
    message: "Auth API is working",
  });
});

export default router;

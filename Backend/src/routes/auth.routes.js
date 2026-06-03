const { Router } = require("express");
const authUser = require("../middleware/authUser");
const {
    register,
    login,
    getMe,
    logout,
} = require("../controllers/auth.controller");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authUser, getMe);
router.post("/logout", logout);

module.exports = router;

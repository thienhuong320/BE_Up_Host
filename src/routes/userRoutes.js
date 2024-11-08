const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUser); // Lấy tất cả user
router.get("/:id", userController.getUserById); // Lấy user theo id
router.post("/create", userController.createUser); // Tạo mới user
router.put("/update/:id", userController.updateUser); // Cập nhật thông tin user
router.delete("/delete/:id", userController.deleteUser); // Xóa user
router.post("/login", userController.loginUser); // Đăng nhập
router.post("/register", userController.registerUser); // Đăng ký
router.get('/total-users', userController.getTotalUsersCount); // Route lấy tổng số người dùng
module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Define routes for admin
router.get("/", adminController.getAllAdmin); // Lấy tất cả admin
router.get("/:id", adminController.getAdminById); // Lấy admin theo id
router.post("/create", adminController.createAdmin); // Tạo mới admin
router.put("/update/:id", adminController.updateAdmin); // Cập nhật admin
router.delete("/delete/:id", adminController.deleteAdmin); // Xóa admin

module.exports = router;

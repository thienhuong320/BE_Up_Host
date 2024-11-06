const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

// Define routes for scores
router.get("/", scoreController.getAllScores); // Lấy tất cả score
router.get("/:id", scoreController.getScoreById); // Lấy score theo id
router.post("/create", scoreController.createScore); // Tạo mới score
router.put("/update/:id", scoreController.updateScore); // Cập nhật score
router.delete("/delete/:id", scoreController.deleteScore); // Xóa score

module.exports = router;

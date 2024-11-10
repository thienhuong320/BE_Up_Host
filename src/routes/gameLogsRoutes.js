const express = require('express');
const router = express.Router();
const gameLogsController = require('../controllers/gameLogsController');

// Define routes for game logs
router.get("/", gameLogsController.getAllGameLogs); // Lấy tất cả game logs
router.get("/:id", gameLogsController.getGameLogById); // Lấy game log theo id
router.post("/create", gameLogsController.createGameLog); // Tạo mới game log

// Thêm route mới để lấy game chơi nhiều nhất
router.get("/most-played", gameLogsController.getMostPlayedGame);

module.exports = router;

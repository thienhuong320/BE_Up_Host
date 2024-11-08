const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

// Define routes for games
router.get("/", gamesController.getAllGames); // Lấy tất cả game
router.get("/:id", gamesController.getGameById); // Lấy game theo id

router.post("/create", gamesController.createGame); // Tạo mới game
router.put("/update/:id", gamesController.updateGame); // Cập nhật game
router.delete("/delete/:id", gamesController.deleteGame); // Xóa game
router.get('/tag/:tag', gamesController.getGameByTag); // Lọc game theo tag


module.exports = router;

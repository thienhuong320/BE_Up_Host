const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

// Define routes for favorites
router.get("/", favoritesController.getAllFavorites); // Lấy tất cả favorite
router.get("/:id", favoritesController.getFavoriteById); // Lấy favorite theo id
router.post("/create", favoritesController.createFavorite); // Tạo mới favorite
router.delete("/delete/:id", favoritesController.deleteFavorite); // Xóa favorite

module.exports = router;

const connection = require("../config/index");

// Get all favorites
const getAllFavorites = async (req, res) => {
    try {
        const [data] = await connection.query('SELECT * FROM favorites');
        res.status(200).send({
            success: true,
            message: 'Get all favorites success',
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get favorite by ID
const getFavoriteById = async (req, res) => {
    const { id } = req.params;
    const [data] = await connection.query('SELECT * FROM favorites WHERE favorite_id = ?', [id]);
    res.status(200).send({ data });
};

// Create favorite
const createFavorite = async (req, res) => {
    try {
        const { user_id, game_id } = req.body;
        const [data] = await connection.query('INSERT INTO favorites (user_id, game_id) VALUES (?, ?)', [user_id, game_id]);
        res.status(200).send({
            success: true,
            message: 'Favorite created successfully',
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete favorite
const deleteFavorite = async (req, res) => {
    const { id } = req.params;
    await connection.query('DELETE FROM favorites WHERE favorite_id = ?', [id]);
    res.status(200).send({ message: 'Favorite deleted successfully' });
};

module.exports = { getAllFavorites, getFavoriteById, createFavorite, deleteFavorite };

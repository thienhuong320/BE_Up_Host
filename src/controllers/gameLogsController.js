const connection = require("../config/index");



// Get game log by ID
const getGameLogById = async (req, res) => {
    const { id } = req.params;
    const [data] = await connection.query('SELECT * FROM game_logs WHERE log_id = ?', [id]);
    res.status(200).send({ data });
};

// Create game log
const createGameLog = async (req, res) => {
    try {
        const { user_id, game_id, action } = req.body;
        const [data] = await connection.query('INSERT INTO game_logs (user_id, game_id, action) VALUES (?, ?, ?)', [user_id, game_id, action]);
        res.status(200).send({
            success: true,
            message: 'Game log created successfully',
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all game logs
const getAllGameLogs = async (req, res) => {
    try {
        const [data] = await connection.query('SELECT * FROM game_logs');
        res.status(200).send({
            success: true,
            message: 'Get all game logs success',
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Hàm lấy thông tin game phổ biến
const getTopScoringUser = async (req, res) => {
    try {
        const [result] = await db.execute(`
            SELECT u.user_name, l.game_id, g.game_name, MAX(s.score) AS max_score, COUNT(*) AS quantity
            FROM game_logs l
            JOIN games g ON l.game_id = g.game_id
            JOIN user u ON l.user_id = u.user_id
            JOIN score s ON l.game_id = s.game_id AND l.user_id = s.user_id
            GROUP BY l.game_id, g.game_name, u.user_name
            ORDER BY quantity DESC, max_score DESC
            LIMIT 1;
        `);
        res.status(200).send({
            success: true,
            message: 'Get all game logs success',
            result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
        
};

module.exports = { getAllGameLogs, getGameLogById, createGameLog, getTopScoringUser };




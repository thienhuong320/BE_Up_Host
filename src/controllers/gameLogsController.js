const connection = require("../config/index");

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

// 
// Game log controller to get most played game
const getMostPlayedGame = async (req, res) => {
    try {
        // Query để lấy game_id có số lượng game log nhiều nhất
        const [result] = await connection.query(`
            SELECT game_id, COUNT(*) AS play_count
            FROM game_logs
            GROUP BY game_id
            ORDER BY play_count DESC
            LIMIT 1
        `);

        // Lấy game_name từ bảng games dựa trên game_id
        if (result.length > 0) {
            const game_id = result[0].game_id;
            const [gameData] = await connection.query('SELECT game_name FROM games WHERE game_id = ?', [game_id]);
            if (gameData.length > 0) {
                res.status(200).send({
                    success: true,
                    message: 'Most played game fetched successfully',
                    data: gameData[0]
                });
            } else {
                res.status(404).send({ success: false, message: 'Game not found' });
            }
        } else {
            res.status(404).send({ success: false, message: 'No game logs found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllGameLogs, getGameLogById, createGameLog, getMostPlayedGame };

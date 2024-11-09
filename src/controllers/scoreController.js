const connection = require("../config/index");

// get all scores
const getAllScores = async (req, res) => {
    try {
        const [data] = await connection.query('SELECT * FROM score'); // Giả sử bạn có bảng scores
        res.status(200).send({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get by id score
const getScoreById = async (req, res) => {
    const { score_id } = req.params;
    try {
        const [data] = await connection.query(`SELECT * FROM score WHERE score_id = ?`, [score_id]);
        if (data.length === 0) {
            return res.status(404).send({ success: false, message: 'Score not found' });
        }
        res.status(200).send({ data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấycác thông tin về điểm số, người dùng và trò chơi.
const getAllScore = async (req, res) => {
    try {
        const data = await connection.query(` SELECT
    score.score_id,score.score,
    JSON_OBJECT(
        'user_id', user.user_id,
        'user_name', user.user_name,
        'email', user.email,
        'thumbnail', user.thumbnail
        
    ) AS user_info,
    JSON_OBJECT(
        'game_id', games.game_id,
        'game_name', games.game_name,
        'genre', games.genre,
        'image', games.image
    ) AS game_info
FROM score
INNER JOIN user ON score.user_id = user.user_id
INNER JOIN games ON score.game_id = games.game_id;`);
        res.status(200).send({ data: data[0] });
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Get all score failed'
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create score
const createScore = async (req, res) => {
    // Logic để tạo mới score
};

// update score
const updateScore = async (req, res) => {
    // Logic để cập nhật score
};

// delete score
const deleteScore = async (req, res) => {
    // Logic để xóa score
};

module.exports = {
    getAllScores,
    getScoreById,
    createScore,
    updateScore,
    deleteScore,
    getAllScore
};

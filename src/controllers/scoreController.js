const connection = require("../config");

// get all scores
const getAllScores = async (req, res) => {
    try {
        const [data] = await connection.query('SELECT * FROM scores'); // Giả sử bạn có bảng scores
        res.status(200).send({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get by id score
const getScoreById = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await connection.query(`SELECT * FROM scores WHERE id = ?`, [id]);
        if (data.length === 0) {
            return res.status(404).send({ success: false, message: 'Score not found' });
        }
        res.status(200).send({ data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
};

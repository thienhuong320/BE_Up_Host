const connection = require("../config/index");


// get all games
const getAllGames = async (req, res) => {
   

    try {
        const data = await connection.query('SELECT * FROM games');
        res.status(200).send({ data: data[0] });
        if(!data){
            return res.status(400).send({
                success: false,
                message: 'Get all games failed'
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   
// get game by id


const getGameByTag = async (req, res) => {
    try {
        const { tag } = req.params; // Lấy tag từ req.params
        const data = await connection.query('SELECT * FROM games WHERE tag = ?', [tag]);

        if (!data || data.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No game found for the specified tag'
            });
        }

        res.status(200).send({ data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getGameById = async (req, res) => {
   
  
    try {
        const { id } = req.params;
        const data = await connection.query(`SELECT * FROM games WHERE game_id = ${id}`);
        res.status(200).send({ data: data[0] });
        if(!data){
            return res.status(400).send({
                success: false,
                message: 'Get game by id failed'
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// create game
const createGame = async (req, res) => {
    try {
        const {  game_name, description, genre, release_date, image } = req.body;
        const data = await connection.query(
            "INSERT INTO games (game_name, description, genre, image, release_date, tag) VALUES (?, ?, ?, ?, ?, ?)",
            [game_name, description, genre, image, release_date, tag]
        );

        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Create game failed'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Create game success',
            data: data[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Create game failed" });
    }
};


// update game
const updateGame = async (req, res) => {
try {
    const { id } = req.params;
    if(!id){
        return res.status(400).send({
            success: false,
            message: 'Game id is required'
        })  
    }
    const { game_name, description, genre, release_date, image } = req.body;
    const data = await connection.query(`UPDATE games SET game_name = ?, description = ?, genre= ?, release_date= ?, image = ? WHERE game_id = ?`, [game_name, description, genre, release_date, image, id]);
    if(!data){
        return res.status(400).send({
            success: false,
            message: 'Update game failed'
        })
    }
    res.status(200).send({
        success: true,
        message: 'Update game success',
        data: data[0]
    })
} catch (error) {
    res.status(500).json({error: error.message})
}
}

// delete game
const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await connection.query(`DELETE FROM games WHERE game_id = ?`, [id]);
        if(!data){
            return res.status(400).send({
                success: false,
                message: 'Delete game failed'
            })
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    getGameByTag
}
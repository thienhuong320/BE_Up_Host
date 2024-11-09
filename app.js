const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const favoritesRoutes = require('./src/routes/favoritesRoutes');
const gameLogsRoutes = require('./src/routes/gameLogsRoutes');
const gamesRoutes = require('./src/routes/gamesRoutes');
const scoreRoutes = require('./src/routes/scoreRoutes');

require('dotenv').config();
const connection = require('./src/config/index.js');

// Body parser middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());
// API Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/gamelogs", gameLogsRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/scores", scoreRoutes);
// Route chính cho root
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});




app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT 1 + 1 AS result');
        res.send(`Database connection successful: ${rows[0].result}`);
    } catch (error) {
        res.status(500).send(`Database connection failed: ${error.message}`);
    }
});



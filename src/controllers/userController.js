const connection = require("../config/index");

// get all user
const getAllUser = async (req, res) => {
    try {
        const [data] = await connection.query('SELECT * FROM user');
        res.status(200).send({
            success: true,
            message: 'Get all user success',
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get by id user
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await connection.query(`SELECT * FROM user WHERE user_id = ?`, [id]);
        if (data.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).send({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create user
const createUser = async (req, res) => {
    try {
        const { user_name, email, password, fullname, phone, dob } = req.body;

        // Kiểm tra người dùng đã tồn tại chưa
        const [existingUser] = await connection.query('SELECT * FROM user WHERE email = ? OR user_name = ?', [email, user_name]);
        if (existingUser.length > 0) {
            return res.status(400).send({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        // Tạo người dùng mới
        const [data] = await connection.query(
            `INSERT INTO user (user_name, email, password, fullname, phone, dob) VALUES (?, ?, ?, ?, ?, ?)`, 
            [user_name, email, password, fullname, phone, dob]
        );

        res.status(201).send({
            success: true,
            message: 'Create user success',
            data: { user_id: data.insertId, user_name, email, fullname }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'User id is required'
            });
        }

        const { user_name, email, password, fullname, phone, dob } = req.body;
        const [result] = await connection.query(
            `UPDATE user SET user_name = ?, email = ?, password = ?, fullname = ?, phone = ?, dob = ? WHERE user_id = ?`,
            [user_name, email, password, fullname, phone, dob, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'User not found or no changes made'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Update user success',
            data: { id, user_name, email, fullname }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await connection.query(`DELETE FROM user WHERE user_id = ?`, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Delete user success'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [data] = await connection.query(`SELECT * FROM user WHERE email = ? AND password = ?`, [email, password]);

        if (data.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.status(200).send({ data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// register user
const registerUser = async (req, res) => {
    try {
        const { user_name, email, password, fullname } = req.body;

        // Kiểm tra người dùng đã tồn tại chưa
        const [existingUser] = await connection.query('SELECT * FROM user WHERE email = ? OR user_name = ?', [email, user_name]);
        if (existingUser.length > 0) {
            return res.status(400).send({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        // Đăng ký người dùng mới
        const [data] = await connection.query(
            `INSERT INTO user (user_name, email, password, fullname) VALUES (?, ?, ?, ?)`, 
            [user_name, email, password, fullname]
        );
        
        res.status(201).send({
            success: true,
            message: 'Register user success',
            data: { user_id: data.insertId, user_name, email, fullname }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get total users count
const getTotalUsersCount = async (req, res) => {
    try {
        const [data] = await connection.query('SELECT COUNT(*) AS total_users FROM user');
        
        // Trả về tổng số người dùng
        res.status(200).send({
            success: true,
            message: 'Get total user count success',
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    registerUser,
    getTotalUsersCount
}

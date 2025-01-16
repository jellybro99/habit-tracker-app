const pool = require("./pool");

async function addUser(username, password) {
    try {
        console.log("Adding user with username: ", username);
        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username, password]
        );
        console.log("User added successfully");
    } catch (err) {
        console.error("Error adding user:", err);
        throw err;
    }
}

async function getUserByUsername(username) {
    try {
        console.log("Getting user with username: ", username);
        const { rows } = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        return rows[0];
    } catch (err) {
        console.error("Error getting user:", err);
        throw err;
    }
}

async function getUserById(id) {
    try {
        console.log("Getting user with id: ", id);
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return rows[0];
    } catch (err) {
        console.error("Error getting user:", err);
        throw err;
    }
}

async function verifyPassword(user, password) {
    try {
        console.log("Checking password for user: ", user);
        return user.password === password;
    } catch {
        console.error("Error checking password:", err);
        throw err;
    }
}

module.exports = {
    addUser,
    getUserByUsername,
    getUserById,
    verifyPassword,
};

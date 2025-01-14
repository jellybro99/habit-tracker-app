const pool = require("./pool");

async function addUser(username, password) {
    try {
        console.log("Adding user with username:", username);
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

module.exports = {
    addUser,
};

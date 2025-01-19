const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addUser = async (username, password) => {
    try {
        await prisma.users.create({
            data: {
                username: username,
                password: password,
            },
        });
    } catch (err) {
        console.error("Error adding user:", err);
        throw err;
    }
};

exports.getUserByUsername = async (username) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                username: username,
            },
        });
        return user;
    } catch (err) {
        console.error("Error getting user:", err);
        throw err;
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: id,
            },
        });
        return user;
    } catch (err) {
        console.error("Error getting user:", err);
        throw err;
    }
};

const prisma = require("../configs/prisma");

const createUser = async (userData) => {
  try {
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar criar o usuário.");
  }
};

const getUsers = async (searchQuery) => {
  try {
    return await prisma.user.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar buscar o usuário.");
  }
};

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar buscar os usuários.");
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deletedUser;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar excluir o usuário.");
  }
};

const updateUser = async (userId, userData) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userData,
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao excluir um registro.");
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Ocorreu um erro ao excluir um registro.");
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserByEmail,
};

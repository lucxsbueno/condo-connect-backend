const prisma = require("../configs/prisma");

const createCondominium = async (condoData) => {
  try {
    const condo = await prisma.condominium.create({
      data: condoData,
    });

    return condo;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar criar o condomínio.");
  }
};

const getCondominiums = async (id) => {
  try {
    const condo = await prisma.condominium.findMany({
      where: {
        adminId: id
      }
    });

    return condo;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar buscar os usuários.");
  }
};

const deleteCondominium = async (id) => {
  try {
    const deletedCondominium = await prisma.condominium.delete({
      where: {
        adminId: id,
      },
    });

    return deletedCondominium;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar excluir o condomínio.");
  }
};

const updateCondominium = async (userId, userData) => {
  try {
    const user = await prisma.condominium.update({
      where: {
        id: userId,
      },
      data: userData,
    });

    return user;
  } catch (error) {
    throw new Error("Ocorreu um erro ao autalizar o registro.");
  }
};

const getCondominiumById = async (id) => {
  try {
    const condo = await prisma.condominium.findUnique({
      where: {
        id: id,
      },
    });

    return condo;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar resgatar o condomínio.");
  }
};

module.exports = {
  createCondominium,
  getCondominiums,
  deleteCondominium,
  updateCondominium,
  getCondominiumById
};

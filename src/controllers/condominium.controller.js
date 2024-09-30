const jwt = require('jsonwebtoken');

const { getCondominiums, createCondominium } = require("../services/condominium.service");
const condominiumSchema = require('../schemas/condominium.schema');

const findAllCondominiums = async (req, res) => {
  const searchQuery = req.query.q;

  const token = req.get("authorization");

  const decoded = jwt.decode(token.slice(7));

  try {
    const condos = await getCondominiums(decoded.user.id);

    return res.status(200).json(condos);
  } catch (error) {
    return res.status(500).json({
      error: "Ocorreu um erro. Não foi possível processar sua solicitação."
    });
  }
};

const createNewCondominium = async (req, res) => {
  await condominiumSchema.validate(req.body, { abortEarly: false });
  const { name, address } = req.body;
  const { user: { id, role } } = jwt.decode(req.get("authorization").slice(7));

  if (role == "RESIDENT") {
    return res.status(400).json({
      error: "Você não tem permissão para criar condomínios, converse com o administrador.",
    });
  }

  const condoData = {
    name,
    address,
    adminId: id
  };

  try {
    const condo = await createCondominium(condoData);

    return res.status(201).json({
      success: "Condomínio criado com sucesso!",
      condo: condo
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
      stack: error,
    });
  }
};

const deleteUserById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(400).json({
        message: "Nenhum usuário encontrado.",
      });
    }

    await userService.deleteUser(id);

    return res.status(200).json({
      message: "Usuário esxluído com sucesso!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Ocorreu um erro. Não foi possível processar sua solicitação.",
      stack: error,
    });
  }
};

const updateUserById = async (req, res) => {
  const userId = Number(req.params.id);
  const userData = req.body;
  delete userData.password;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).json({
        info: "Nenhum usuário encontrado.",
      });
    }

    await updateUser(userId, userData);

    return res.status(200).json({
      success: "Usuário atualizado com sucesso!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Ocorreu um erro. Não foi possível processar sua solicitação.",
    });
  }
};

module.exports = {
  findAllCondominiums,
  createNewCondominium
};

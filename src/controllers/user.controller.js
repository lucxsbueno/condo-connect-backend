const { sign } = require("jsonwebtoken");
const {
  getUserByEmail,
  createUser,
  getUsers,
  getUserById,
  updateUser,
} = require("../services/user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const userSchema = require("../schemas/user.schema");

/**
 * error = sempre que algo der errado
 * success = sempre que algo der certo
 * info = quando é preciso passar uma mensagem de informação
 */

const signup = async (req, res) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });

    const userData = req.body;

    const email = userData.email;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(400).json({
        error: "Já existe um usuário com este email.",
      });
    }

    const salt = genSaltSync(10);
    req.body.password = hashSync(userData.password, salt);

    const userCreated = await createUser(userData);

    delete userCreated.password;

    return res.status(201).json({
      success: "Conta criada com sucesso!",
      user: userCreated,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }

    return res.status(500).json({
      error: "Ocorreu um erro. Não foi possível processar sua solicitação.",
      stack: error,
    });
  }
};

const findAllUsers = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const users = await getUsers(searchQuery);

    return res.status(200).json(users);
  } catch (error) {

    return res.status(500).json({
      error: "Ocorreu um erro. Não foi possível processar sua solicitação."
    });
  }
};

const findUserById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(400).json({
        message: "Nenhum usuário encontrado.",
      });
    }

    return res.status(200).json(user);
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
      error: "Ocorreu um erro. Não foi possível processar sua solicitação."
    });
  }
};

const signin = async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);

    //if there are no records
    if (!user) {
      return res.status(400).json({
        error: "E-mail ou senha inválidos! Tente novamente."
      });
    }

    //compare if password is correct
    const isRight = compareSync(req.body.password, user.password);

    if (isRight) {
      delete user.password;

      const jwt = {
        //data transfer to jwt
        payload: { user },
        secret: "12345678",
        options: {
          issuer: "condoconnect",
          algorithm: "HS256",
          expiresIn: "7d", // 10000ms = 10s
        },
      };

      sign(jwt.payload, jwt.secret, jwt.options, (error, token) => {
        if (error) {
          console.log("[jwt error]: ", error);
        }

        return res.status(202).json({
          success: "Login efetuado com sucesso!",
          token: token,
        });
      });
    } else {
      return res.status(400).json({
        error: "E-mail ou senha inválidos! Tente novamente.",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Ocorreu um erro. Não foi possível processar sua solicitação."
    });
  }
};

module.exports = {
  signin,
  signup,
  findAllUsers,
  findUserById,
  deleteUserById,
  updateUserById,
};

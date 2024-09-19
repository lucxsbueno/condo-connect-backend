const yup = require("yup");

const roleEnum = ["RESIDENT", "MANAGER", "ADMIN"];

const userSchema = yup.object().shape({
  name: yup.string().min(3).required("Nome é obrigatório!"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório!"),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .max(20, "A senha pode ter no máximo 20 caracteres.")
    .required("A senha é obrigatória."),
  role: yup
    .string()
    .oneOf(roleEnum, "O valor de role deve ser RESIDENT, MANAGER ou ADMIN")
    .required("O campo função é obrigatório."),
});

module.exports = userSchema;

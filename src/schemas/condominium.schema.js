const yup = require("yup");

const condominiumSchema = yup.object().shape({
  name: yup.string().min(3).required("Nome é obrigatório!"),
  address: yup
    .string()
    .required("O endereço é obrigatório!")
});

module.exports = condominiumSchema;

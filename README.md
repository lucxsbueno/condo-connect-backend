### Autenticação

> Esta API utiliza JWT para autenticação. Após o login bem-sucedido, o cliente deve enviar o token JWT no header Authorization para as rotas protegidas.

```http
Authorization: Bearer <token>
```

## API

<details>
<summary>Tipos de retorno</summary>

**Erro**:

```json
{
  "error": "<message>"
}
```

**Sucesso**:

```json
{
  "success": "<message>"
}
```

**Informativo**:

```json
{
  "info": "<message>"
}
```

</details>

### Usuário

<details>
<summary>Cadastro de usuário</summary>

**Endpoint**: `/users/signup`  
**Método**: `POST`  
**Descrição**: Cria um novo usuário.

**Requisição**:

```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "Full Name",
  "role": "RESIDENT, MANAGER or ADMIN"
}
```

**Respostas**:

**201**: Usuário criado com sucesso.

```json
{
  "success": "Conta criada com sucesso!",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "role": "RESIDENT, MANAGER or ADMIN"
  }
}
```

**400**: Validação ou erro de duplicidade de e-mail.

```json
{
  "error": "Já existe um usuário com este email."
}
```

</details>

<details>
<summary>Login de usuário</summary>

**Endpoint**: `/users/signin`  
**Método**: `POST`  
**Descrição**: Autentica um usuário com e-mail e senha, retornando um token JWT.

**Requisição**:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Respostas**:

**202**: Login efetuado com sucesso.

```json
{
  "success": "Login efetuado com sucesso!",
  "token": "jwt_token"
}
```

**404**: E-mail ou senha inválidos.

```json
{
  "error": "E-mail ou senha inválidos! Tente novamente."
}
```

</details>

<details>
<summary>Listar usuários</summary>

**Endpoint**: `/users/`  
**Search Query**: `?q=<name,email,role>`  
**Método**: `GET`  
**Autorização**: `Bearer Token`.  
**Descrição**: Retorna uma lista de todos os usuários.

**Requisição**:

Nenhuma requisição específica necessária.

**Respostas**:

**200**: Lista de usuários.

```json
[
  {
    "id": 1,
    "email": "user1@example.com",
    "name": "User 1"
  },
  {
    "id": 2,
    "email": "user2@example.com",
    "name": "User 2"
  }
]
```

**500**: Erro interno no servidor.

```json
{
  "error": "Ocorreu um erro. Não foi possível processar sua solicitação."
}
```

</details>

<details>
<summary>Buscar usuário por id</summary>

**Endpoint**: `/users/:id`  
**Método**: `GET`  
**Autorização**: `Bearer Token`.  
**Descrição**: Retorna um usuário específico com base no id.

**Requisição**:

Nenhuma requisição específica necessária.

**Respostas**:

**200**: Usuário encontrado.

```json
{
  "id": 1,
  "email": "user1@example.com",
  "name": "User 1",
  "role": "RESIDENT, MANAGER or ADMIN"
}
```

**400**: Usuário não encontrado.

```json
{
  "message": "Nenhum usuário encontrado."
}
```

</details>

<details>
<summary>Excluir usuário por id</summary>

**Endpoint**: `/users/:id`
**Método**: `DELETE`  
**Autorização**: `Bearer Token`.  
**Descrição**: Exclui um usuário específico com base no id.

**Requisição**:

DELETE /users/1

**Respostas**:

**200**: Usuário excluído com sucesso.

```json
{
  "message": "Usuário excluído com sucesso!"
}
```

**400**: Usuário não encontrado.

```json
{
  "message": "Nenhum usuário encontrado."
}
```

</details>

</details>

<details>
<summary>Atualizar Usuário por id</summary>

**Endpoint**: `/users/:id`
**Método**: `PUT`  
**Autorização**: `Bearer Token`.  
**Descrição**: Atualiza os dados de um usuário com base no id.

**Requisição**:

```json
{
  "email": "updated@example.com",
  "name": "Updated Name",
  "role": "RESIDENT, MANAGER or ADMIN"
}
```

**Respostas**:

**200**: Usuário atualizado com sucesso.

```json
{
  "message": "Usuário atualizado com sucesso!"
}
```

**400**: Usuário não encontrado.

```json
{
  "message": "Nenhum usuário encontrado."
}
```

</details>

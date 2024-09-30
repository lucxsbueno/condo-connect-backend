const express = require("express");
const app = express();
const port = 3030;

// routes
const indexRouter = require("./routes/index.router");
const userRouter = require("./routes/user.router");
const condominiumRouter = require("./routes/condominium.router");

app.use(express.json()); // Para analisar corpos JSON

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/condos", condominiumRouter);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}.`);
});

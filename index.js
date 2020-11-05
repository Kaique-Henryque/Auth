const express = require("express");
const routerAuth = require("./routers/auth.router");

const app = express();

app.use(express.json());
app.use("/auth", routerAuth);

app.listen(8080);

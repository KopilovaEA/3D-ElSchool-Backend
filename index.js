const express = require("express");
require("dotenv").config();
const controllers = require("./controllers/controllers.js");
const app = express();
app.use(express.json());

app.get("/users", controllers.getUsers);
app.get("/courses", controllers.getCourses);
app.post("/access", controllers.getAccess);

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен по ссылке http://localhost:${process.env.PORT}`);
});

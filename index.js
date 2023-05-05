require("dotenv").config();
const express = require("express");
const controllers = require("./controllers/controllers.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/users", controllers.getUsers);
app.get("/courses", controllers.getCourses);
app.post("/access", controllers.getAccess);
app.post("/login", controllers.checkLogin)
app.post("/user", controllers.getUser)
app.put("/register", controllers.checkRegister)
app.post("/password", controllers.changePassword)

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен по ссылке http://localhost:${process.env.PORT}`);
});

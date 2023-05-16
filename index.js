require("dotenv").config();
const express = require("express");
const controllers = require("./controllers/controllers.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.CLIENT_URL_1,
      process.env.CLIENT_URL_2,
      process.env.CLIENT_URL_3,
    ],
  })
);

app.get("/users", controllers.getUsers);
app.get("/courses", controllers.getCourses);
app.post("/courses", controllers.getUserCourses);
app.post("/access", controllers.getAccess);
app.post("/login", controllers.checkLogin);
app.post("/user", controllers.getUser);
app.post("/register", controllers.checkRegister);
app.post("/password", controllers.changePassword);
app.post("/email", controllers.changeEmail);
app.post("/name", controllers.changeName);
app.post("/add_course_to_user", controllers.addFreeCourseToUser);
app.post("/course_access", controllers.courseAccess);
app.post("/admin", controllers.checkAdmin);
app.post("/all_users", controllers.getAllUsers);
app.post("/add_course_access", controllers.addCourseAccess);
app.post("/remove_access", controllers.removeCourseAccess);

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порту ${process.env.PORT}!`);
});

const db = require("../db/connect.js");

class Controlers {
  getUsers(req, res) {
    db.query("SELECT * FROM user", (err, result) => {
      console.log(result);
      res.json(result);
    });
  }
  getCourses(req, res) {
    db.query("SELECT * FROM course", (err, result) => {
      console.log(result);
      res.json(result);
    });
  }
  getAccess(req, res) {
    db.query(
      `SELECT user.email, course.title FROM user INNER JOIN user_course ON user.id = user_course.id_user INNER JOIN course ON user_course.id_course = course.id WHERE user.email = '${req.body.email}'`,
      (err, result) => {
        console.log(result);
        res.json(result);
      }
    );
  }
  checkLogin(req, res) {
    db.query(
      `SELECT * FROM user WHERE user.email = "${req.body.email}" AND user.password = "${req.body.password}"`,
      (err, result) => {
        if (result.length === 0) {
          console.log("Ничего не найдено");
          res.json({ message: "Ошибка" });
        } else {
          delete result[0]["password"];
          console.log(result[0]);
          res.json(result[0]);
        }
      }
    );
  }
  getUser(req, res) {
    db.query(
      `SELECT * FROM user WHERE user.id = "${req.body.id}"`,
      (err, result) => {
        if (result.length === 0) {
          console.log("Ничего не найдено");
          res.json({ message: "Ошибка" });
        } else {
          delete result[0]["password"];
          console.log(result[0]);
          res.json(result[0]);
        }
      }
    );
  }
}

module.exports = new Controlers();

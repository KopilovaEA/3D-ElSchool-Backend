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
  checkRegister(req, res) {
    db.query(
      `SELECT * FROM user WHERE user.email = "${req.body.email}"`,
      (err, result) => {
        if (result.length !== 0) {
          console.log("Такой пользователь уже существует");
          res.json({ message: "Ошибка" });
        } else {
          db.query(
            `INSERT INTO user (id, name, email, password) VALUES ('','${req.body.name}','${req.body.email}','${req.body.password}')`,
            (err, result) => {
              console.log(result.insertId);
              res.json({ id: result.insertId });
            }
          );
        }
      }
    );
  }
  changePassword(req, res) {
    console.log(req.body);
    db.query(
      `UPDATE user SET password='${req.body.password}' WHERE user.id=${req.body.id}`,
      (err, result) => {
        console.log(result);
        res.json(result);
      }
    );
  }
  changeEmail(req, res) {
    console.log(req.body);
    db.query(
      `UPDATE user SET email='${req.body.email}' WHERE user.id=${req.body.id}`,
      (err, result) => {
        console.log(result);
        res.json(result);
      }
    );
  }
  changeName(req, res) {
    console.log(req.body);
    db.query(
      `UPDATE user SET name='${req.body.name}' WHERE user.id=${req.body.id}`,
      (err, result) => {
        console.log(result);
        res.json(result);
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
  addFreeCourseToUser(req, res) {
    console.log(req.body);
    db.query(
      `SELECT * FROM user_course WHERE user_course.id_user = ${req.body.user_id} AND user_course.id_course = ${req.body.course_id}`,
      (err, result) => {
        if (result.length !== 0) {
          console.log(result);
          res.json({ id: result[0].id_course });
        } else {
          db.query(
            `INSERT INTO user_course (id, id_user, id_course) VALUES ('',${req.body.user_id},${req.body.course_id})`,
            (err, result) => {
              console.log(result.insertId);
              res.json({ id: result.insertId });
            }
          );
        }
      }
    );
  }
  courseAccess(req, res) {
    db.query(
      `SELECT * FROM user_course WHERE user_course.id_user = ${req.body.user_id} AND user_course.id_course = ${req.body.course_id}`,
      (err, result) => {
        if (result.length !== 0) {
          console.log(result);
          res.json({ id: result[0].id_course });
        } else {
          res.json({ message: "Нет доступа!" });
        }
      }
    );
  }
  getUserCourses(req, res) {
    db.query(
      `SELECT course.type, course.id, course.title, course.description FROM user_course INNER JOIN course ON user_course.id_course = course.id WHERE user_course.id_user = ${req.body.user_id};`,
      (err, result) => {
        console.log(result);
        res.json(result);
      }
    );
  }
  checkAdmin(req, res) {
    db.query(
      `SELECT user.role, user.id FROM user WHERE id = ${req.body.user_id};`,
      (err, result) => {
        console.log(result);
        res.json({ id: result[0].id, role: result[0].role });
      }
    );
  }
  getAllUsers(req, res) {
    db.query(
      `SELECT user.name FROM user WHERE user.id = ${req.body.id} AND role = 'admin';`,
      (err, result) => {
        if (result.length !== 0) {
          db.query(
            `SELECT user.id, user.email, user.name, course.title FROM user INNER JOIN user_course ON user_course.id_user = user.id INNER JOIN course ON user_course.id_course = course.id;`,
            (err, result) => {
              console.log(result);
              res.json(result);
            }
          );
        } else {
          res.json({ message: "Нет доступа!" });
        }
      }
    );
  }
}

module.exports = new Controlers();

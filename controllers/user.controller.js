var user = require("../models/user");
var roles = require("../models/role");
var departments = require("../models/department");
var jwt = require("jsonwebtoken");
var db = require("../config");
const { validationResult, body } = require("express-validator");
var session = require("express-session");
const role = require("../models/role");
const department = require("../models/department");

class UserController {
  register(req, res) {
    try {
      const data = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (data.confirmPassword && data.password !== data.confirmPassword) {
        return res
          .status(400)
          .json({ error: "Password and Confirm Password do not match" });
      }

      data.password = user.hashPassword(data.password);

      const userObj = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        department_id: data.department_id,
        role: data.role,
        group: data.group,
      };
      user.create(userObj, (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else if (!rows) {
          return res.status(404).json({ error: "Register failed" });
        }

        const token = jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res
          .status(200)
          .json({ message: "Register success", token: token });
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  login(req, res) {
    const data = req.body;

    if (!data.email || !data.password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [data.email],
      async (err, users) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (users.length === 0) {
          return res
            .status(404)
            .json({ error: "Invalid Email or Password!!!" });
        }

        const userObj = users[0];
        if (user.checkPassword(data.password, userObj.password) === false) {
          return res.status(400).json({ error: "Invalid Email or Password" });
        }
        const token = jwt.sign(
          { id: userObj.id, email: userObj.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        db.query(
          "UPDATE users SET refreshToken = ? WHERE id = ?",
          [token, userObj.id],
          (err, rows) => {
            if (err) {
              res.status(500).json({ error: err });
            } else if (!rows) {
              res.status(404).json({ error: "User not found" });
            }
          }
        );
        return res.status(200).json({ token: token, user: userObj });
      }
    );
  }

  create(req, res) {
    try {
      const data = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (data.confirmPassword && data.password !== data.confirmPassword) {
        return res
          .status(400)
          .json({ error: "Password and Confirm Password do not match" });
      }
      data.password = user.hashPassword(data.password);
      const role = req.user.role_id;
      // console.log(role);
      const userObj = [];
      if (role == 4) {
        userObj.push({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          department_id: data.department_id,
          role: data.role,
          group: data.group,
        });
      }
      if (role == 1) {
        userObj.push({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          department_id: data.department_id,
          role: data.role,
          group: req.user.group_id,
        });
      }
      user.create(userObj[0], (err, rows) => {
        if (err && err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        } else if (!rows) {
          return res.status(404).json({ error: "Create failed" });
        }
        return res.status(200).json({ message: "Create success" });
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async read(req, res) {
    try {
      if (req.user.role_id != 4 || req.user.role_id != 1) {
        const queryStatus = req.query.status;
        const users = await new Promise((resolve, reject) => {
          db.query(
            "SELECT a.`name`, a.`email`, a.`is_active` AS `status`, a.`phone`, b.`id` AS role, c.`id` AS `group`, a.department_id, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.id = ?",
            [req.params.id],
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        if (users.length === 0) {
          return res.status(404).json({
            error: "User not found",
          });
        }
        if (queryStatus != undefined) {
          users[0].is_active = queryStatus;
          await new Promise((resolve, reject) => {
            db.query(
              "UPDATE users SET is_active = ? WHERE id = ?",
              [users[0].is_active, req.params.id],
              function (error, results, fields) {
                if (error) reject(error);
                else resolve(results);
              }
            );
          });
        }
        console.log(users);
        return res.json(users[0]);
      } else {
        return res.status(401).json({
          auth: false,
          message: "Unauthorized.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  profile(req, res) {
    const user = req.user;
    db.query(
      "SELECT a.name, a.email, a.phone, b.`name` as role FROM users a, `role` b WHERE a.id = ? AND a.`role_id` = b.`id`",
      [user.id],
      function (err, rows) {
        if (err) {
          res.status(500).json({ error: err });
        } else if (!rows) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.json(rows);
        }
      }
    );
  }

  updateProfile(req, res) {
    try {
      const user = req.user;
      const data = req.body;
      if (data.password_old) {
        body("password_new")
          .isLength({ min: 5 })
          .withMessage("Password must be at least 5 chars long");

        if (
          users.checkPassword(req.body.password_old, user.password) === false
        ) {
          return res.status(400).json({ error: "Invalid Password" });
        }
        if (data.password_new) {
          data.password_new = users.hashPassword(data.password_new);
          console.log(data.password_new);
          db.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [data.password_new, user.id],
            function (err, rows) {
              if (err) {
                return res.status(500).json({ error: err });
              } else if (!rows) {
                return res.status(404).json({ error: "User not found" });
              } else {
                return res.json(rows);
              }
            }
          );
        }
        return res.status(400).json({ error: "Error server!!!" });
      }
      if (data.name) {
        db.query(
          "UPDATE users SET name = ? WHERE id = ?",
          [data.name, user.id],
          function (err, rows) {
            if (err) {
              res.status(500).json({ error: err });
            } else if (!rows) {
              res.status(404).json({ error: "Error!!!" });
            } else {
              res.json(rows);
            }
          }
        );
      }
      if (data.phone) {
        body("phone")
          .isLength({ min: 10 })
          .withMessage("Phone must be at least 10 chars long");
        db.query(
          "UPDATE users SET phone = ? WHERE id = ?",
          [data.phone, user.id],
          function (err, rows) {
            if (err) {
              res.status(500).json({ error: err });
            } else if (!rows) {
              res.status(404).json({ error: "User not found" });
            } else {
              res.json(rows);
            }
          }
        );
      }
      if (data.email) {
        body("email").isEmail().withMessage("must be an email");
        if (body("email").isEmail().withMessage("must be an email") === false) {
          return res.status(400).json({ error: "Invalid Email" });
        }
        const errors = validationResult(data.email);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        db.query(
          "UPDATE users SET email = ? WHERE id = ?",
          [data.email, user.id],
          function (err, rows) {
            if (err) {
              return res.status(500).json({ error: err });
            } else if (!rows) {
              return res.status(404).json({ error: "User not found" });
            } else {
              return res.json(rows);
            }
          }
        );
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async getUserbyRoleSuperAdmin(req, res) {
    const role = req.user.role_id;
    let page = req.query.page;
    let perPage = 10;
    let offset = (page - 1) * perPage;
    let totalPage = 0;
    let countQuery;
    let dataQuery;
    switch (role) {
      case 1: //admin
        countQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT COUNT(*) AS total FROM users WHERE group_id = ? AND role_id != 4 AND role_id != 1",
            [req.user.group_id],
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        dataQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT a.`id`,a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.id != ? AND a.role_id != 4 AND a.group_id = ? LIMIT ?,?",
            [req.user.id, req.user.group_id, offset, perPage],
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        break;
      case 4: //super admin
        countQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT COUNT(*) AS total FROM users WHERE role_id != 4",
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        dataQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT a.`id`,a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.id != ? AND a.role_id != 4 LIMIT ?,?",
            [req.user.id, offset, perPage],
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        break;
      default:
        break;
    }
    try {
      const [countResult, results] = await Promise.all([countQuery, dataQuery]);
      totalPage = Math.ceil(countResult[0].total / perPage);
      return res.json({
        data: results,
        page: page,
        perPage: perPage,
        total: totalPage,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getByGroupAndNoDepartment(req, res) {
    let page = req.query.page;
    let perPage = 5;
    let offset = (page - 1) * perPage;
    let total = 0;
    let countQuery;
    let dataQuery;
    countQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM users WHERE group_id = ? AND department_id IS NULL",
        [req.user.group_id],
        function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
    dataQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT a.`id`,a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.id != ? AND a.role_id != 4 AND a.group_id = ? AND d.`name` IS NULL LIMIT ?,?",
        [req.user.id, req.user.group_id, offset, perPage],
        function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
    try {
      
      const [countResult, results] = await Promise.all([countQuery, dataQuery]);
      total = Math.ceil(countResult[0].total / perPage);
      return res.json({
        data: results,
        page: page,
        perPage: perPage,
        total: total,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDepartmentSelected(req, res) {
    try {
      user.deleteDepartmentSelected(req.body, function (err, rows) {
        if (err) {
          return res.status(500).json({ error: err });
        } else if (!rows) {
          return res.status(404).json({ error: "User not found" });
        } else {
          return res.json(rows);
        }
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  async addDepartmentSelected(req, res) {
   try {
    // console.log(req.body);
    user.addDepartmentSelected(req.params.id, req.body, function (err, rows) {
      if (err) {
        return res.status(500).json({ error: err });
      } else if (!rows) {
        return res.status(404).json({ error: "User not found" });
      } else {
        return res.status(200).json({ message: "Add success" });
      }
    }
    );
   }
    catch (error) {
      console.log(error);
    }
  }


  // get all user by group and department

  async getByGroupAndDepartment(req, res) {
    let page = req.query.page || 1;
    if (page < 1) {
      page = 1;
    }
    let perPage = 5;
    let offset = (page - 1) * perPage;
    let total = 0;
    let countQuery;
    let dataQuery;
    countQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM users WHERE group_id = ? AND department_id IS NOT NULL",
        [req.user.group_id],
        function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
    dataQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT a.`id`,a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.id != ? AND a.role_id != 4 AND a.group_id = ? AND d.`name` IS NOT NULL LIMIT ?,?",
        [req.user.id, req.user.group_id, offset, perPage],
        function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
    try {
      const [countResult, results] = await Promise.all([countQuery, dataQuery]);
      total = Math.ceil(countResult[0].total / perPage);
      return res.json({
        data: results,
        page: page,
        perPage: perPage,
        total: total,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    try {
      const role = req.user.role_id;
      if (role === 4 || role === 1) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const datauser = req.user;
        if (req.body.password === "") {
          req.body.password = datauser.password;
        } else {
          req.body.password = user.hashPassword(req.body.password);
        }
        user.update(req.params.id, req.body, function (err, rows) {
          if (err) {
            return res.status(500).json({ error: err });
          } else if (!rows) {
            return res.status(404).json({ error: "User not found" });
          } else {
            return res.json(rows);
          }
        });
      } else {
        return res.status(401).json({
          auth: false,
          message: "Unauthorized.",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  updateRole(id, data, callback) {
    try {
      const role = req.user.role_id;
      if (role === 4 || role === 1) return user.updateRole(id, data, callback);
      else
        return res.status(401).json({
          auth: false,
          message: "Unauthorized.",
        });
    } catch (error) {
      console.log(error);
    }
  }

  delete(req, res) {
    try {
      const role = req.user.role_id;
      if (role === 4 || role === 1) {
        user.delete(req.params.id, function (err, count) {
          if (err) {
            res.json(err);
          } else {
            res.json(count);
          }
        });
      } else {
        return res.status(401).json({
          auth: false,
          message: "Unauthorized.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteMany(req, res) {
    try {
      const role = req.user.role_id;
      if (role === 4 || role === 1) {
        user.deleteMany(req.body, function (err, count) {
          if (err) {
            res.json(err);
          } else {
            res.json(count);
          }
        });
      } else {
        return res.status(401).json({
          auth: false,
          message: "Unauthorized.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAll(red, res) {
    user.getAll((err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }

  getAdmin(red, res) {
    user.getAdmin((err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }

  logout(req, res) {
    try {
      const token = jwt.verify(
        req.headers["x-access-token"],
        process.env.JWT_SECRET
      );
      if (!token) {
        return res.status(401).json({
          auth: false,
          message: "Unauthorized.",
        });
      }

      return user.deleteToken(token.id, (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else if (!rows) {
          return res.status(404).json({ error: "User not found" });
        } else {
          return res
            .header({ "x-access-token": "" })
            .json({ message: "Logout success" });
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

module.exports = new UserController();

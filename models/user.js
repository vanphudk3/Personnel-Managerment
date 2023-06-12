var db = require("../config"); //reference of dbconnection.js
const bcrypt = require("bcrypt");
const roles = require("./role");
class User {
  constructor(
    name,
    email,
    phone,
    password,
    avatar,
    refreshToken,
    departmentId,
    role,
    group
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.avatar = avatar;
    this.refreshToken = refreshToken;
    this.departmentId = departmentId;
    this.role = role;
    this.group = group;
  }

  setNameRole = async (roleId) => {
    switch (roleId) {
      case 1:
        return "admin";
      case 2:
        return "supervisor";
      case 3:
        return "user";
      case 4:
        return "superadmin";
      default:
        return "user";
    }
  };

  createVsSuperAdmin(user, callback) {
    try {
      return db.query(
        "Insert into users (name, email, phone, password) values(?, ?, ?, ?)",
        [user.name, user.email, user.phone, user.password],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  create(user, callback) {
    try {
      return db.query(
        "Insert into users (name, email, phone, password, department_id, role_id, group_id) values(?, ?, ?, ?, ?, ?, ?)",
        [
          user.name,
          user.email,
          user.phone,
          user.password,
          user.department_id,
          user.role,
          user.group,
        ],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  read(userId, callback) {
    try {
      return db.query("SELECT a.`name`, a.`email`, a.`is_active` AS `status`, a.`phone`, b.`id` AS role, c.`id` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.id = ?", [userId], callback);
    } catch (err) {
      console.log(err);
    }
  }

  update(userId, user, callback) {
    try {
      return db.query(
        "Update users set `name` = ?, `email` = ?, `phone` = ?, `password` = ?, `group_id` = ?, `department_id` = ?, `role_id` = ? where `id` = ?",
        [user?.name, user?.email, user?.phone, user?.password, user?.group, user?.department_id, user?.role, userId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  updateStatus(userId, status, callback) {
    try {
      return db.query(
        "Update users set `is_active` = ? where id = ?",
        [status, userId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  updateRole(userId, roleId, callback) {
    try {
      return db.query(
        "Update users set role_id = ? where id = ?",
        [roleId, userId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  profile = async (id) => {
    try {
      await db.get("users").find({ id: id }).write();
      return true;
    } catch {
      return false;
    }
  };
  getRefreshToken(userId, callback) {
    try {
      return db.query(
        "Select refreshToken from users where id = ?",
        [userId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  delete(userId, callback) {
    try {
      return db.query("Delete from users where id = ?", [userId], callback);
    } catch (err) {
      console.log(err);
    }
  }

  deleteMany(userIds, callback) {
    try {
      return db.query(
        "DELETE FROM `users` WHERE `id` IN (" + userIds.join() + ")",
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  getAll(callback) {
    try {
      return db.query(
        "SELECT a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id`",
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  getByGroup(groupId, callback) {
    try {
      return db.query(
        "SELECT a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.`group_id` = ?",
        [groupId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  // get user by group but haven't department
  getByGroupAndNoDepartment(groupId, callback) {
    try {
      return db.query(
        "SELECT a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.`group_id` = ? AND a.`department_id` IS NULL",
        [groupId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  addDepartmentSelected(departmentId, userids, callback) {
    try {
      return db.query(
        "Update users set department_id = ? where id in (" + userids.join() + ")",
        [departmentId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  deleteDepartmentSelected(userIds, callback) {
    try {
      return db.query(
        "Update users set department_id = NULL where id in (" + userIds.join() + ")",
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  // get user by group and department
  getByGroupAndDepartment(groupId, departmentId, callback) {
    try {
      return db.query(
        "SELECT a.`name`, a.`email`, a.`is_active` AS `status`, b.`name` AS role, c.`name` AS `group`, d.`name` AS department FROM users a LEFT JOIN role b ON a.role_id = b.id LEFT JOIN groups c ON a.`group_id` = c.id LEFT JOIN department d ON a.`department_id`=d.`id` WHERE a.`group_id` = ? AND a.`department_id` = ?",
        [groupId, departmentId],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  checkPassword(inputPassword, storedPassword) {
    return bcrypt.compareSync(inputPassword, storedPassword);
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  findById = async (id) => {
    try {
      await db.get("users").find({ id: id }).write();
      return true;
    } catch {
      return false;
    }
  };

  findByEmail(email, callback) {
    try {
      return db.query("Select * from users where email = ?", [email], callback);
    } catch (err) {
      console.log(err);
    }
  }

  getByEmail(email) {
    try {
      return db.query("Select * from users where email = ?", [email]);
    } catch (err) {
      console.log(err);
    }
  }

  findByEmailAndPassword(email, password, callback) {
    try {
      return db.query(
        "Select * from users where email = ? and password = ?",
        [email, password],
        callback
      );
    } catch (err) {
      console.log(err);
    }
  }

  count = async () => {
    try {
      await db.get("users").size().value();
      return true;
    } catch {
      return false;
    }
  };

  getAllUser = async () => {
    try {
      const query = db.query("SELECT * FROM users");

      query
        .then((results) => {
            // Thực hiện truy vấn thành công, dữ liệu trả về sẽ nằm trong biến results
            console.log(results);
            return results;
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.log(error);
        });
    } catch {
      return false;
    }
  };

  getAdmin(callback) {
    try {
      db.query(
        "Select id from role where name = ?",
        [roles.ROLE_ADMIN],
        (err, rows) => {
          if (err) {
            return callback(err, null);
          }
          return db.query(
            "Select * from users where role_id = ?",
            [rows[0].id],
            callback
          );
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  deleteToken(userId, callback) {
    try {
      db.query(
        "DELETE FROM `user_token` WHERE `user_id` = ?",
        [userId],
        callback
      );
    } catch {
      return false;
    }
  }
}

module.exports = new User();

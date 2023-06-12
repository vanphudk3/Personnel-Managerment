var db = require("../config"); //reference of dbconnection.js
var Role = require("../models/role");

class RoleController {
    list(callback) {
        return Role.getAll(callback);
    }

    read(id, callback) {
        return db.query("select * from role where Id=?", [id], callback);
    }

    create(data, callback) {
        return db.query("Insert into role (Name) values(?)", [data.Name], callback);
    }

    update(id, data, callback) {
        return db.query("update role set Name=? where Id=?", [data.Name, id], callback);
    }

    delete(id, callback) {
        return db.query("delete from role where Id=?", [id], callback);
    }
}

module.exports = new RoleController();
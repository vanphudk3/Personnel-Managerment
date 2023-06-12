var db = require('../config'); //reference of dbconnection.js

class Role {
    constructor() {
        this.id = 0;
        this.name = '';
    }
    ROLE_SUPERADMIN = 'superadmin';
    ROLE_ADMIN = 'admin';
    ROLE_SUPERVISOR = 'supervisor';
    ROLE_USER = 'user';

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }


    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    create(data,callback) {
        return db.query("Insert into role (Name) values(?)", [data], callback);
    }

    getAll(callback) {
        return db.query("Select * from role", callback);
    }

    getIDByName = async (name) => {
        try {
            await db.query("Select id from role where name = ?", [name]);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    findById = async (id) => {
        try {
            await db
                .get('role')
                .find({id: id})
                .write();
            return true;
        } catch {
            return false;
        }
    };

}

module.exports = new Role();
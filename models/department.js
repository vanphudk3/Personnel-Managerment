var db = require('../config'); //reference of dbconnection.js
var company = require('./group');
class Department {
    constructor(id, name, description, compayId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.compayId = compayId;
    }


    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getCompanyId() {
        return this.compayId;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setCompanyId(compayId) {
        this.compayId = compayId;
    }
    // timestamp
    setCreateAt(createAt) {
        this.createAt = new Date(createAt);
    }

    setUpdateAt(updateAt) {
        this.updateAt = new Date(updateAt);
    }

    create(department, callback) {
        try {
            return db.query("Insert into department (name, description, group_id, created_at, updated_at) values(?, ?, ?, ?, ?)", [department.name, department.description, department.groupId, department.createAt, department.updateAt, department.compayId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    read(departmentId, callback) {
        try {
            return db.query("SELECT a.*, b.name AS `group` FROM department a LEFT JOIN groups b ON a.`group_id`=b.`id` where a.id=?", [departmentId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    update(departmentId, department, callback) {
        try {
            return db.query("Update department set name = ?, description = ? ,updated_at = ? where id = ?", [department.name, department.description, department.updateAt, departmentId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    updateStatus(departmentId, department, callback) {
        try {
            return db.query("Update department set status = ? where id = ?", [department.status, departmentId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    delete(departmentId, callback) {
        try {
            return db.query("Delete from department where id = ?", [departmentId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    getAll(callback) {
        try {
            return db.query("Select a.*, b.name as `group` from department a left join groups b on a.group_id = b.id", callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    getByGroupId(groupId, callback) {
        try {
            return db.query("Select a.*, b.name as `group` from department a left join groups b on a.group_id = b.id where a.group_id = ?", [groupId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    deleteMany(departmentIds, callback) {
        try {
            return db.query("DELETE FROM `department` WHERE `id` IN (" + departmentIds.join() + ")", callback);
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new Department();
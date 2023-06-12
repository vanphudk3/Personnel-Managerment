var db = require('../config'); //reference of dbconnection.js

class Group {
    constructor(id, name, address, phone, email, website, logo) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.logo = logo;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    getPhone() {
        return this.phone;
    }

    getEmail() {
        return this.email;
    }

    getWebsite() {
        return this.website;
    }

    getLogo() {
        return this.logo;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setAddress(address) {
        this.address = address;
    }

    setPhone(phone) {
        this.phone = phone;
    }

    setEmail(email) {
        this.email = email;
    }

    setWebsite(website) {
        this.website = website;
    }

    setLogo(logo) {
        this.logo = logo;
    }

    create(group, callback) {
        try {
            return db.query("Insert into groups (name, address, phone, email, website, description) values(?, ?, ?, ?, ?, ?)", [group.name, group.address, group.phone, group.email, group.website, group.logo, group.description], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    update(groupId,group,callback) {
        try {
            return db.query("Update groups set `name` = ?, address = ?, phone = ?, email = ?, website = ?, description = ? where id = ?", [group.name, group.address, group.phone, group.email, group.website, group.description, groupId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    updateStatus(groupId,group,callback) {
        try {
            return db.query("Update groups set `status` = ? where id = ?", [group.status, groupId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    delete(groupId,callback) {
        try {
            return db.query("Delete from groups where id = ?", [groupId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    deleteMany(groupIds,callback) {
        try {
            return db.query("DELETE FROM `groups` WHERE `id` IN (" + groupIds.join() + ")", callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    read(groupId,callback) {
        try {
            return db.query("Select * from groups where id = ?", [groupId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    getAll(callback) {
        try {
            return db.query("Select * from groups", callback);
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = new Group();
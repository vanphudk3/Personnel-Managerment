var db = require("../../config");

class Shift {
    create(shift, callback) {
        try {
        return db.query(
            "Insert into shifts (description, start_time, end_time, group_id, department_id, created_at, updated_at) values(?, ?, ?, ?, ?, ?)",
            [
            shift.description,
            shift.startTime,
            shift.endTime,
            shift.groupId,
            shift.departmentId,
            shift.createAt,
            shift.updateAt,
            ],
            callback
        );
        } catch (err) {
        console.log(err);
        }
    }
    
    read(shiftId, callback) {
        try {
        return db.query("Select * from shifts where id = ?", [shiftId], callback);
        } catch (err) {
        console.log(err);
        }
    }
    
    readAll(callback) {
        try {
        return db.query("Select * from shifts", callback);
        } catch (err) {
        console.log(err);
        }
    }
    
    update(shiftId, shift, callback) {
        try {
        return db.query(
            "Update shifts set description = ?, start_time = ?, end_time = ?, group_id = ?, department_id = ?, updated_at = ? where id = ?",
            [
            shift.description,
            shift.startTime,
            shift.endTime,
            shift.groupId,
            shift.departmentId,
            shift.updateAt,
            shiftId,
            ],
            callback
        );
        } catch (err) {
        console.log(err);
        }
    }
    
    delete(shiftId, callback) {
        try {
        return db.query("Delete from shifts where id = ?", [shiftId], callback);
        } catch (err) {
        console.log(err);
        }
    }

    deleteMany(shiftIds, callback) {
        try {
        return db.query("Delete from shifts where id in (" + shiftIds.join() + ")", callback);
        } catch (err) {
        console.log(err);
        }
    }
}

module.exports = new Shift();
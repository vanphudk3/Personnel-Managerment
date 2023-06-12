var db = require("../../config");

class BreakTimeLog {
    create(breakTimeLog, callback) {
        try {
            return db.query(
                "Insert into break_time_logs (start_time, end_time, user_id, group_id, department_id, created_by, created_at, updated_at) values(?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    breakTimeLog.startTime,
                    breakTimeLog.endTime,
                    breakTimeLog.userId,
                    breakTimeLog.groupId,
                    breakTimeLog.departmentId,
                    breakTimeLog.createdBy,
                    breakTimeLog.createAt,
                    breakTimeLog.updateAt,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    read(breakTimeLogId, callback) {
        try {
            return db.query(
                "Select * from break_time_logs where id = ?",
                [breakTimeLogId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readAll(callback) {
        try {
            return db.query("Select * from break_time_logs", callback);
        } catch (err) {
            console.log(err);
        }
    }

    update(breakTimeLogId, breakTimeLog, callback) {
        try {
            return db.query(
                "Update break_time_logs set start_time = ?, end_time = ?, user_id = ?, group_id = ?, department_id = ?, updated_at = ? where id = ?",
                [
                    breakTimeLog.startTime,
                    breakTimeLog.endTime,
                    breakTimeLog.userId,
                    breakTimeLog.groupId,
                    breakTimeLog.departmentId,
                    breakTimeLog.updateAt,
                    breakTimeLogId,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    delete(breakTimeLogId, callback) {
        try {
            return db.query(
                "Delete from break_time_logs where id = ?",
                [breakTimeLogId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    deleteAll(breakTimeLogIds, callback) {
        try {
            return db.query(
                "Delete from break_time_logs where id in (" + breakTimeLogIds.join() + ")",
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }
    

    readByUserId(userId, callback) {
        try {
            return db.query(
                "SELECT * FROM break_time_logs where user_id=?",
                [userId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readByGroupId(groupId, callback) {
        try {
            return db.query(
                "SELECT * FROM break_time_logs where group_id=?",
                [groupId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readByDepartmentId(departmentId, callback) {
        try {
            return db.query(
                "SELECT * FROM break_time_logs where department_id=?",
                [departmentId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new BreakTimeLog();
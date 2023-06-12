var db = require("../../config"); //reference of dbconnection.js

class OverTime {
    create(overTime, callback) {
        try {
            return db.query(
                "insert into over_times (start_time, end_time, user_id, number_of_hours, status, description, created_at, updated_at) values(?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    overTime.startTime,
                    overTime.endTime,
                    overTime.userId,
                    overTime.numberOfHours,
                    overTime.status,
                    overTime.description,
                    overTime.createAt,
                    overTime.updateAt,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    read(overTimeId, callback) {
        try {
            return db.query(
                "select * from over_times where id = ?",
                [overTimeId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readAll(callback) {
        try {
            return db.query("select * from over_times", callback);
        } catch (err) {
            console.log(err);
        }
    }

    update(overTimeId, overTime, callback) {
        try {
            return db.query(
                "update over_times set start_time = ?, end_time = ?, user_id = ?, number_of_hours = ?, status = ?, description = ?, updated_at = ? where id = ?",
                [
                    overTime.startTime,
                    overTime.endTime,
                    overTime.userId,
                    overTime.numberOfHours,
                    overTime.status,
                    overTime.description,
                    overTime.updateAt,
                    overTimeId,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    delete(overTimeId, callback) {
        try {
            return db.query(
                "delete from over_times where id = ?",
                [overTimeId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    deleteMany(overTimeIds, callback) {
        try {
            return db.query(
                "delete from over_times where id in (" + overTimeIds.join() + ")",
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readByUserId(userId, callback) {
        try {
            return db.query(
                "select * from over_times where user_id = ?",
                [userId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readByStatus(status, callback) {
        try {
            return db.query(
                "select * from over_times where status = ?",
                [status],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readByUserIdAndStatus(userId, status, callback) {
        try {
            return db.query(
                "select * from over_times where user_id = ? and status = ?",
                [userId, status],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new OverTime();
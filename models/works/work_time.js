var db = require("../../config");

class WorkTime {
    create(workTime, callback) {
        try {
            return db.query(
                "Insert into work_times (start_time, end_time, user_id, shift_id, description, created_at, updated_at) values(?, ?, ?, ?, ?, ?, ?)",
                [
                    workTime.startTime,
                    workTime.endTime,
                    workTime.userId,
                    workTime.shiftId,
                    workTime.description,
                    workTime.createAt,
                    workTime.updateAt,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    read(workTimeId, callback) {
        try {
            return db.query(
                "Select * from work_times where id = ?",
                [workTimeId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readAll(callback) {
        try {
            return db.query("Select * from work_times", callback);
        } catch (err) {
            console.log(err);
        }
    }

    update(workTimeId, workTime, callback) {
        try {
            return db.query(
                "Update work_times set start_time = ?, end_time = ?, user_id = ?, shift_id = ?, description = ?, updated_at = ? where id = ?",
                [
                    workTime.startTime,
                    workTime.endTime,
                    workTime.userId,
                    workTime.shiftId,
                    workTime.description,
                    workTime.updateAt,
                    workTimeId,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    delete(workTimeId, callback) {
        try {
            return db.query(
                "Delete from work_times where id = ?",
                [workTimeId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    deleteMany(workTimeIds, callback) {
        try {
            return db.query(
                "Delete from work_times where id in (" + workTimeIds.join() + ")",
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    getByUserId(userId, callback) {
        try {
            return db.query(
                "Select * from work_times where user_id = ?",
                [userId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }
    
}

module.exports = new WorkTime();
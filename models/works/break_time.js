var db = require('../../config');

class BreakTime {
    create(breakTime, callback) {
        try {
            return db.query("Insert into break_time (start_time, end_time, user_id, work_schedule_id, created_at, updated_at) values(?, ?, ?, ?, ?, ?)", 
                [
                breakTime.startTime, 
                breakTime.endTime, 
                breakTime.userId, 
                breakTime.workScheduleId, 
                breakTime.createAt, 
                breakTime.updateAt
                ], 
                callback
                );
            }
            catch (err) {
                console.log(err);
            }
        }

    update(breakTime, callback) {
        try {
            return db.query("Update break_time set start_time = ?, end_time = ?, user_id = ?, work_schedule_id = ?, updated_at = ? where id = ?", 
                [
                breakTime.startTime, 
                breakTime.endTime, 
                breakTime.userId, 
                breakTime.workScheduleId, 
                breakTime.updateAt, 
                breakTime.id
                ], 
                callback
                );
            }
            catch (err) {
                console.log(err);
            }
        }

    delete(breakTimeId, callback) {
        try {
            return db.query("Delete from break_time where id = ?", [breakTimeId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    read(breakTimeId, callback) {
        try {
            return db.query("SELECT * FROM break_time where id=?", [breakTimeId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    readByWorkScheduleId(workScheduleId, callback) {
        try {
            return db.query("SELECT * FROM break_time where work_schedule_id=?", [workScheduleId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    readByUserId(userId, callback) {
        try {
            return db.query("SELECT * FROM break_time where user_id=?", [userId], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    readByUserIdAndDate(userId, date, callback) {
        try {
            return db.query("SELECT * FROM break_time where user_id=? and date(start_time) = ?", [userId, date], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

    readByUserIdAndDateRange(userId, startDate, endDate, callback) {
        try {
            return db.query("SELECT * FROM break_time where user_id=? and date(start_time) between ? and ?", [userId, startDate, endDate], callback);
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = new BreakTime();
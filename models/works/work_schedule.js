var db = require("../../config");

class WorkSchedule {
    create(workSchedule, callback) {
        try {
            return db.query(
                "Insert into work_schedules (date, description, group_id, department_id, created_at, updated_at) values(?, ?, ?, ?, ?, ?)",
                [
                    workSchedule.date,
                    workSchedule.description,
                    workSchedule.groupId,
                    workSchedule.departmentId,
                    workSchedule.createAt,
                    workSchedule.updateAt,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    read(workScheduleId, callback) {
        try {
            return db.query(
                "Select * from work_schedules where id = ?",
                [workScheduleId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    readAll(callback) {
        try {
            return db.query("Select * from work_schedules", callback);
        } catch (err) {
            console.log(err);
        }
    }

    update(workScheduleId, workSchedule, callback) {
        try {
            return db.query(
                "Update work_schedules set date = ?, description = ?, group_id = ?, department_id = ?, updated_at = ? where id = ?",
                [
                    workSchedule.date,
                    workSchedule.description,
                    workSchedule.groupId,
                    workSchedule.departmentId,
                    workSchedule.updateAt,
                    workScheduleId,
                ],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    updateStatus(workScheduleId, workSchedule, callback) {
        try {
            return db.query(
                "Update work_schedules set status = ? where id = ?",
                [workSchedule.status, workScheduleId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    delete(workScheduleId, callback) {
        try {
            return db.query(
                "Delete from work_schedules where id = ?",
                [workScheduleId],
                callback
            );
        }
        catch (err) {
            console.log(err);
        }
    }

    deleteMany(workScheduleIds, callback) {
        try {
            return db.query(
                "Delete from work_schedules where id in (" + workScheduleIds.join() + ")",
                callback
            );
        }
        catch (err) {
            console.log(err);
        }
    }

    getByGroupId(groupId, callback) {
        try {
            return db.query(
                "Select * from work_schedules where group_id = ?",
                [groupId],
                callback
            );
        } catch (err) {
            console.log(err);
        }
    }

    getByDepartmentId(departmentId, callback) {
        try {
            return db.query(
                "Select * from work_schedules where department_id = ?",
                [departmentId],
                callback
            );
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new WorkSchedule();
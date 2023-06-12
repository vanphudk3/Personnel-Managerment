var shift = require("../../models/works/shift");

class ShiftController {
    create(req, res) {
        try {
            shift.create(req.body, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Shift created successfully!",
                        data: result,
                    });
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    read(req, res) {
        try {
            shift.read(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({ data: result[0] });
            });
        } catch (err) {
            console.log(err);
        }
    }

    readAll(req, res) {
        try {
            let page = req.query.page;
            let perPage = 10;
            let offset = (page - 1) * perPage;
            let totalPage = 0;
            const role = req.user.role_id;
            let countQuery;
            let dataQuery;
            switch (role) {
                case 1,2: // admin or supervisor
                    countQuery = new Promise((resolve, reject) => {
                        db.query(
                            "SELECT COUNT(*) AS total FROM `shifts` WHERE `group_id` = ?",
                            [req.user.group_id],
                            function (error, results, fields) {
                                if (error) reject(error);
                                else resolve(results);
                            }
                        );
                    });
                    dataQuery = new Promise((resolve, reject) => {
                        db.query(
                            "SELECT a.id,a.name, a.start_time, a.end_time, a.created_at, b.name as `group`, c.name as `department` FROM `shifts` a left join `groups` b on a.group_id = b.id left join department c on a.department_id = c.id WHERE a.`group_id` = ? LIMIT ?,?",
                            [req.user.group_id, offset, perPage],
                            function (error, results, fields) {
                                if (error) reject(error);
                                else resolve(results);
                            }
                        );
                    });
                    break;
                case 3: // user
                    countQuery = new Promise((resolve, reject) => {
                        db.query(
                            "SELECT COUNT(*) AS total FROM `shifts` WHERE `group_id` = ? AND `department_id` = ?",
                            [req.user.group_id, req.user.department_id],
                            function (error, results, fields) {
                                if (error) reject(error);
                                else resolve(results);
                            }
                        );
                    });
                    dataQuery = new Promise((resolve, reject) => {
                        db.query(
                            "SELECT a.id,a.name, a.start_time, a.end_time, a.created_at, b.name as `group`, c.name as `department` FROM `shifts` a left join `groups` b on a.group_id = b.id left join department c on a.department_id = c.id WHERE a.`group_id` = ? AND a.`department_id` = ? LIMIT ?,?",
                            [req.user.group_id, req.user.department_id, offset, perPage],
                            function (error, results, fields) {
                                if (error) reject(error);
                                else resolve(results);
                            }
                        );
                    });
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }

    update(req, res) {
        try {
            shift.update(req.params.id, req.body, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({
                    message: "Shift updated successfully!",
                    data: result,
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

    delete(req, res) {
        try {
            shift.delete(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Shift deleted successfully!",
                        data: result,
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    deleteMany(req, res) {
        try {
            const data = req.body;
            shift.deleteMany(data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Shift deleted successfully!",
                        data: result,
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new ShiftController();
var breakTimeLog = require('../../models/works/break_time_log');

class BreakTimeLogController {
    create(req, res) {
        try {
            const data = req.body;
            data.createAt = new Date();
            data.updateAt = new Date();
            breakTimeLog.create(data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Break time log created successfully!",
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
            breakTimeLog.read(req.params.id, (err, result) => {
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
            breakTimeLog.readAll((err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({ data: result });
            });
        } catch (err) {
            console.log(err);
        }
    }

    update(req, res) {
        try {
            const data = req.body;
            data.updateAt = new Date();
            breakTimeLog.update(req.params.id, data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({
                    message: "Break time log updated successfully!",
                    data: result,
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

    delete(req, res) {
        try {
            breakTimeLog.delete(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res
                    .status(200)
                    .json({ message: "Break time log deleted successfully!" });
            });
        } catch (err) {
            console.log(err);
        }
    }

    deleteAll(req, res) {
        try {
            breakTimeLog.deleteAll((err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res
                    .status(200)
                    .json({ message: "Break time logs deleted successfully!" });
            });
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new BreakTimeLogController();
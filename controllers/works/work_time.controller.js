var workTime = require("../../models/works/work_time");

class WorkTimeController {
    create(req, res) {
        try {
            const data = req.body;
            data.createAt = new Date();
            data.updateAt = new Date();
            workTime.create(data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Work time created successfully!",
                        data: result,
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    read(req, res) {
        try {
            workTime.read(req.params.id, (err, result) => {
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
            workTime.readAll((err, result) => {
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
            workTime.update(req.params.id, data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({
                    message: "Work time updated successfully!",
                    data: result,
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

    delete(req, res) {
        try {
            workTime.delete(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Work time deleted successfully!",
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
            workTime.deleteMany(req.body, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Work time deleted successfully!",
                        data: result,
                    });
                }
            }
            );
        }
        catch (err) {
            console.log(err);
        }
    }

    readByUserId(req, res) {
        try {
            workTime.getByUserId(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({ data: result });
            });
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new WorkTimeController();
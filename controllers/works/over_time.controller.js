var overTime = require("../../models/works/over_time");

class OverTimeController {
    create(req, res) {
        try {
            const data = req.body;
            data.createAt = new Date();
            data.updateAt = new Date();
            overTime.create(data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Over time created successfully!",
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
            overTime.read(req.params.id, (err, result) => {
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
            overTime.readAll((err, result) => {
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
            overTime.update(req.params.id, data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({
                    message: "Over time updated successfully!",
                    data: result,
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

    delete(req, res) {
        try {
            overTime.delete(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Over time deleted successfully!",
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
            overTime.deleteMany(req.body, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Over time deleted successfully!",
                        data: result,
                    });
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = new OverTimeController();
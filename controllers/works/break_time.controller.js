var breakTime = require('../../models/works/break_time');

class BreakTimeController {
    create(req, res) {
        try {
            const data = req.body;
            data.createAt = new Date();
            data.updateAt = new Date();
            breakTime.create(data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({
                        message: "Break time created successfully!",
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
            breakTime.read(req.params.id, (err, result) => {
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
            breakTime.readAll((err, result) => {
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
            breakTime.update(req.params.id, data, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({
                    message: "Break time updated successfully!",
                    data: result,
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    delete(req, res) {
        try {
            breakTime.delete(req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({
                    message: "Break time deleted successfully!",
                    data: result,
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new BreakTimeController();
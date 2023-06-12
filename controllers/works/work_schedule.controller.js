const { tr } = require("faker/lib/locales");
var workSche = require("../../models/works/work_schedule");
var db = require("../../config");
class WorkScheduleController {
  create(req, res) {
    try {
      const data = req.body;
      data.createAt = new Date();
      data.updateAt = new Date();
      workSche.create(data, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: "successfully!",
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
      workSche.read(req.params.id, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        res.status(200).json({ data: result[0] });
      });
    } catch (err) {
      console.log(err);
    }
  }
  // get work schedule by group id
  async readAll(req, res) {
    let page = req.query.page;
    let perPage = 10;
    let offset = (page - 1) * perPage;
    let totalPage = 0;
    const role = req.user.role_id;
    let countQuery;
    let dataQuery;
    switch (role) {
      case 1: // admin
        countQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT COUNT(*) AS total FROM `work_schedules` WHERE `group_id` = ?",
            [req.user.group_id],
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        dataQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT a.id,a.date, a.created_at, b.name as `group`, c.name as `department` FROM `work_schedules` a left join `groups` b on a.group_id = b.id left join department c on a.department_id = c.id WHERE a.`group_id` = ? LIMIT ?,?",
            [req.user.group_id, offset, perPage],
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        break;
      case 3: //user
        countQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT COUNT(*) AS total FROM `work_schedules` WHERE `group_id` = ? and `department_id` = ?",
            [req.user.group_id, req.user.department_id],
            function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            }
          );
        });
        dataQuery = new Promise((resolve, reject) => {
          db.query(
            "SELECT a.id,a.date, a.created_at, b.name as `group`, c.name as `department` FROM `work_schedules` a left join `groups` b on a.group_id = b.id left join department c on a.department_id = c.id WHERE a.`group_id` = ? and a.`department_id` = ? LIMIT ?,?",
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
    try {
      const [countResult, results] = await Promise.all([countQuery, dataQuery]);
      totalPage = Math.ceil(countResult[0].total / perPage);
      res.status(200).json({
        data: results,
        page: page,
        perPage: perPage,
        total: totalPage,
      });
    } catch (err) {
      console.log(err);
    }
  }

  update(req, res) {
    try {
      const data = req.body;
      console.log(data);
      data.updateAt = new Date();
      workSche.update(req.params.id, data, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        res.status(200).json({
          message: "Work schedule updated successfully!",
          data: result,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  delete(req, res) {
    try {
      workSche.delete(req.params.id, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: "Work schedule deleted successfully!",
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
      workSche.deleteMany(req.body, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: "Work schedule deleted successfully!",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  readByDepartmentId(req, res) {
    try {
      workSche.getByDepartmentId(req.params.id, (err, result) => {
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

module.exports = new WorkScheduleController();

const { de } = require("faker/lib/locales");
var department = require("../models/department");
var db = require("../config");
class DepartmentController {
  create(req, res) {
    try {
      const data = req.body;
      data.createAt = new Date();
      data.updateAt = new Date();
      department.create(data, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: "Department created successfully!",
            data: result,
          });
        }
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
      department.update(req.params.id, data, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: "Department updated successfully!",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  //   get all department have pagination
  async getAll(req, res) {
    let page = req.query.page;
    if (!page || isNaN(parseInt(page))) {
      // Xử lý lỗi khi giá trị page không tồn tại hoặc không phải là số
      return res.status(400).json({ error: "Invalid page number" });
    }
    let perPage = 5;
    let offset = (page - 1) * perPage;
    let totalPage = 0;
    let countQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM `department`",
        function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
    const departmentQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT a.*, b.`name` AS `group` FROM `department` a LEFT JOIN `groups` b ON a.`group_id`=b.id where a.group_id= "+ [req.user.group_id] + " LIMIT " +
          perPage +
          " OFFSET " +
          offset,
        function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
    try {
      const [countResult, results] = await Promise.all([
        countQuery,
        departmentQuery,
      ]);
      // Retrieve the total count from countResult and calculate totalPage
      totalPage = Math.ceil(countResult[0].total / perPage);
      return res.json({
        data: results,
        page: page,
        perPage: perPage,
        total: totalPage,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }

  //   get all department
  getAllDepartment(req, res) {
    try {
      department.getByGroupId(req.user.group_id,(err, rows) => {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getByGroupId(req, res) {
    try {
      department.getByGroupId(req.params.id, (err, rows) => {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  read(req, res) {
    try {
      const queryStatus = req.query.status;
      department.read(req.params.id, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        if (queryStatus != undefined) {
          result[0].status = queryStatus;
          department.updateStatus(req.params.id, result[0], (err, result) => {
            if (err) {
              res.json(err);
            }
          });
        }
        res.status(200).json({ data: result[0] });
      });
    } catch (err) {
      console.log(err);
    }
  }

  delete(req, res) {
    try {
      department.delete(req.params.id, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: "Department deleted successfully!",
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
      department.deleteMany(data, (err, result) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          res.status(200).json({
            message: "Department deleted successfully!",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new DepartmentController();

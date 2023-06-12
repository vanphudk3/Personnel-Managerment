const { body } = require("express-validator");
var group = require("../models/group");
var db = require("../config");
const { validationResult } = require("express-validator");
class GroupController {
  create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Invalid information! Please check again.",
        });
      }
      group.create(req.body, (err, rows) => {
        if (err) {
          res.json(err);
        }
        res.json({ message: "group created!" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Invalid information! Please check again.",
        });
      }
      // req.body.updatedAt = new Date();
      // req.body.dayActive = new Date();
      group.update(req.params.id, req.body, (err, rows) => {
        if (err) {
          res.json(err);
        }
        res.json(rows);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(req, res) {
    try {
      console.log(req);
      const status = req.query.status;
      if (status != "0" && status != "1") {
        return res.status(400).json({ error: "Invalid status" });
      }
      // console.log(status);
      db.query(
        "UPDATE `groups` SET `status` = ? WHERE `id` = ?",
        [status, req.params.id],
        function (error, results, fields) {
          if (error) throw error;
          if (results.affectedRows === 0) {
            return res.status(404).json({
              error: "Group not found",
            });
          }
          res.json({ message: "Group updated!" });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const isgroupUsed = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM `users` WHERE `group_id` = ?",
          [req.params.id],
          function (error, results, fields) {
            if (error) reject(error);
            else resolve(results.length > 0);
          }
        );
      });
      if (isgroupUsed) {
        return res.status(400).json({
          error: "group is used by user!",
        });
      }
      group.delete(req.params.id, (err, rows) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ message: "group deleted!" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMany(req, res) {
    try {
      const groupIds = req.body;
      let users = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM `users`",
          function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
          }
        );
      });
      const isgroupUsed = users.some(user => groupIds.includes(user.group_id));
      if (isgroupUsed) {
        return res.status(400).json({
          error: "group is used by user!",
        });
      }
      group.deleteMany(groupIds, (err, rows) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ message: "group deleted!" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req, res) {
    let page = req.query.page;
    let perPage = 10;
    let offset = (page - 1) * perPage;
    let totalPage = 0;
    let countQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) as total FROM `groups`",
        function (error, countResult, fields) {
          if (error) reject(error);
          else resolve(countResult);
        }
      );
    });

    const dataQuery = new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `groups` LIMIT " + perPage + " OFFSET " + offset,
        function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });

    try {
      const [countResult, results] = await Promise.all([countQuery, dataQuery]);
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

  getgroup(req, res) {
    try {
      group.getAll((err, rows) => {
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
      group.read(req.params.id, (err, rows) => {
        if (err) {
          res.json(err);
        }
        if (rows.length === 0) {
          return res.status(404).json({
            error: "group not found",
          });
        }
        if (queryStatus != undefined) {
          rows[0].status = queryStatus;
          group.updateStatus(req.params.id, rows[0], (err, rows) => {
            if (err) {
              res.json(err);
            }
          });
        }
        res.json(rows[0]);
      });


    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new GroupController();

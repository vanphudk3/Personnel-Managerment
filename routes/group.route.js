var express = require('express');
var router = express.Router();
const { body } = require("express-validator");
var group_controller = require("../controllers/group.controller");
const authenticate = require("../middlewares/authenticate.middleware");
const authenticateSuperAdmin = require("../middlewares/authenticateSuperAdmin.middleware");

router.get("/", authenticateSuperAdmin, group_controller.getAll);
// getCompany not paginate
router.get("/getCompany", authenticateSuperAdmin, group_controller.getgroup);
router.get("/:id", authenticateSuperAdmin, group_controller.read);
router.post(
  "/",
  authenticateSuperAdmin,
  [
    body("email").isEmail().normalizeEmail(),
    body("website").isURL(),
    body("phone").isMobilePhone(),
  ],
  group_controller.create
);
router.put("/:id", authenticateSuperAdmin, [
  body("email").isEmail().normalizeEmail(),
  body("website").isURL(),
  body("phone").isMobilePhone(),
], group_controller.update);

// router.get("/:id", authenticate, group_controller.updateStatus);
router.delete("/:id", authenticateSuperAdmin, group_controller.delete);
router.post("/deleteSelected", authenticateSuperAdmin, group_controller.deleteMany);

module.exports = router;

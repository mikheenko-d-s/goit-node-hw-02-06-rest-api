const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  validateUserLogin,
  validateSubscriptionUser,
} = require("./validationUser");
const {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  userStarter,
  userPro,
  userBusiness,
} = require("../../controllers/users");
const guard = require("../../../helpers/guard");
const { Subscription } = require("../../../config/constants");
const role = require("../../../helpers/role");
const loginLimit = require("../../../helpers/rate-limit-login");

router.patch("/", guard, validateSubscriptionUser, updateSubscription);

router.get("/starter", guard, role(Subscription.STARTER), userStarter);

router.get("/pro", guard, role(Subscription.PRO), userPro);

router.get("/business", guard, role(Subscription.BUSINESS), userBusiness);

router.post("/signup", validateUserSignup, signup);

router.post("/login", loginLimit, validateUserLogin, login);

router.post("/logout", guard, logout);

router.get("/current", guard, current);

module.exports = router;

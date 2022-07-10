const router = require("express").Router();
const UserRoutes = require("./user-routes");
const ThoughtRoutes = require("./thought-routes");

router.use("/users", UserRoutes);
router.use("/thoughts", ThoughtRoutes);

module.exports = router;

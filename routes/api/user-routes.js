const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// /api/Users
router.route("/").get(getAllUser).post(createUser);

// /api/Users/:id
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;

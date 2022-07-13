const { User, Thought } = require("../models");

const userController = {
  // get all user
  getAllUser(req, res) {
    User.find({})
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      runValidators: true,
      new: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete user and their thoughts
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((deletedUser) => {
        if (!deletedUser) {
          res.status(404).json({ message: "No user with this id!" });
          return;
        }
        return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and their thoughts have been deleted!" });
      })
      .catch((err) => res.json(err));
  },

  // add a friend
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbFriendData);
      })
      .catch((err) => res.json(err));
  },

  // delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { $eq: params.friendId } } },
      { new: true }
    )
      .then((deletedFriend) => {
        if (!deletedFriend) {
          res.status(404).json({ message: "No friend with this id!" });
          return;
        }
        res.json(deletedFriend);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;

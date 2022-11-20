const {register, login, getCurrentUser} = require("./controllers/auth");
const {showTodos, addTodo } = require("./controllers/todos");
const express = require("express");
const router = express.Router();
const auth = require('./middleware/verifyAuth');

router.get("/", (req, res) => {
    res.send("Let's build a CRUD API!");
});

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);
router.get("/todos", auth, showTodos);
router.post("/add", auth, addTodo);

module.exports = router;
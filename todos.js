const todo = require('./model/Todo');

async function showTodos(req, res) {
    const todos = await todo.find( {UserId: req.user._id});
    res.send(todos);
    console.log(todos);
}

async function addTodo(req, res) {
    try {
        const newTodo = await todo.create({
            UserId: req.user._id,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
        });
        res.status(200).json({
            data: newTodo,
            success: true
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false});
    }

}

module.exports = { showTodos, addTodo };
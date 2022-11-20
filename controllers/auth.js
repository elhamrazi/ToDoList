const user = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const jwtToken = config.get('jwtSecret');

async function register(req, res, next) {
    let encryptedPass;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("invalid input, try again");
        }
        try {
            const tmp = await user.findOne({email});
            if (tmp) {
                res.status(400).json({status: 'error', message: "user already exists, try again"});
            }
        } catch (e) {
            console.log(e);
        }
        encryptedPass = await bcrypt.hash(password, 10);
        const usr = new user({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPass,
        });

        try {
            const s = await usr.save(); // this is an async operation. this returns a promise
            console.log(s);
            res.json(usr.name,
                usr.email);
        } catch (ex) {
            // res.send(ex);
            next(ex);

        }
    } catch (err) {
        console.log(err);
        next(err);
    }

}


async function login(req, res) {
    try {
        const {email, password} = req.body;
        console.log(password);
        try {
            const usr = await user.findOne({email})
            if (!usr) {
                return res.status(400).json({status: 'error', error: 'invalid input'})
            }
        } catch (e) {
            console.log(e);
        }
        console.log(usr);
        const passCompare = await bcrypt.compare(password, usr.password);
        console.log(password)
        if (passCompare){
            jwt.sign({_id: usr._id, email: usr.email}, jwtToken, {
                    expiresIn: 36000},
                (err, token) =>{
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                });

        }
        else return res.status(400).json({status: 'error', message: "invalid"});
    } catch (err){
        console.log(err);
    }

}

async function getCurrentUser(req, res) {
    console.log(req);
    try {
        const usr = await user.findById(req.user._id);
        console.log(usr)
        res.send(usr);
    }
    catch (err){
        console.log(err);
    }
}
module.exports = { register, login, getCurrentUser};
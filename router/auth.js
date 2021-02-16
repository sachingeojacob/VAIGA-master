const router = require('express').Router();
const {Login, Registration} = require('../models/auth');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyjwt = require('./verifytoken');

//POST endpoint
router.post('/register', async (req, res) => {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);
    const usernameExists = await Login.findOne({username: req.body.username});
    const emailExists = await Registration.findOne({email: req.body.email});
    if(usernameExists) {
        return res.status(400).json({"error": "Username already exists!"});
    }
    if(emailExists) {
        return res.status(400).json({"error": "Email already exists!"});
    }
    const loginObj = new Login({
        username: req.body.username,
        password: hashPassword,
        roleID: req.body.roleID
    });
    const registrationObj = new Registration({
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        position: req.body.position,
        mobile: req.body.mobile,
        image: req.body.image,
        loginID: loginObj._id
    });
    try {
        const loginData = await loginObj.save();
        const regData = await registrationObj.save();
        const token = jwt.sign({_id: loginObj._id}, process.env.TOKEN);
        res.header('auth-token', token).status(200).json({"Login": loginData, "Registration": regData, "token": token});
    } catch(err) {
        res.status(401).json({"err": err});
    }
});

// Login ENdpoint
router.post('/login', async (req,res) => {
    const loguser = await Login.findOne({ username: req.body.username });
    if (loguser) {
        const logpassword = await bcryptjs.compare(req.body.password, loguser.password);
        if (logpassword) {
            const token = jwt.sign({ _id: loguser._id }, process.env.TOKEN);
            res.header('auth-token', token).status(200).json({ "success": token, "userid": loguser._id, "roleid": loguser.roleID});
        } else {
            return res.status(400).json({ "error": "Invalid password!" });
        }
    } else {
        return res.status(400).json({ "error": "Invalid username!" });
    }
})


router.get('/getuser/:id', async(req, res) => {
    const users = await Registration.findOne({loginID: req.params.id}).populate('position');
    try {
        res.status(200).json({"user": users});
    } catch(err) {
        res.status(401).json({"error": "Something went wrong"});
    }
})


module.exports = router;
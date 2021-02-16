const router = require('express').Router();
const { Login } = require('../models/auth');
const {Position} = require('../models/position');
const verifyjwt = require('./verifytoken');

// POST endpoint
router.post('/position', async (req,res) => {
    const nameExist = await Position.findOne({name: req.body.name});
    if(nameExist) {
        res.status(400).json({"error": "Position already exist!"});
    }
    const positionObj = new Position ({
        name: req.body.name,
        departmentID: req.body.departmentID
    })
    try {
        const positionData = await positionObj.save();
        res.status(200).json({"Position": positionData});
    } catch(err) {
        res.status(401).json({"err": err});
    }
});

//GET endpoint
router.get('/position', async (req, res) => {
    const positionData = await Position.find({});
    try{
        res.status(200).json({"Position": positionData});
    }catch(err) {
        res.status(401).json({"err": err})
    }
});


//UPDATE Location endpoint
router.patch('/position/:id', verifyjwt, async (req,res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await Position.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no position under this id"})
    }
    try{
        const updatePosition = await Position.updateOne({_id: req.params.id}, req.body);
        const updateResult = await Position.findById({_id: req.params.id});
        res.status(200).json({"Position": updateResult});
    } catch(err) {
        res.status(401).json({"err": err});
    }
})

//DELETE endpoint
router.delete('/positiondel/:id',verifyjwt, async(req, res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await Position.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no position under this id"})
    }
    try{
        const deletePosition = await Position.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({"Status": "Deleted Succesfully"});
    }
    catch(err) {
        res.status(401).json({"err": err});
    }
})

module.exports = router;
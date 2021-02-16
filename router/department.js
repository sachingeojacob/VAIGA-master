const router = require('express').Router();
const {Department} = require('../models/department');
const verifyjwt = require('./verifytoken');


// POST endpoint
router.post('/department', async (req,res) => {
    const nameExist = await Department.findOne({name: req.body.name});
    if(nameExist) {
        res.status(400).json({"error": "Department name already exist!"});
    }
    const deptObj = new Department ({
        name: req.body.name,
    })
    try {
        const deptData = await deptObj.save();
        res.status(200).json({"Department": deptData});
    } catch(err) {
        res.status(401).json({"err": err});
    }
});

//GET endpoint
router.get('/department', async (req, res) => {
    const deptData = await Department.find({});
    try{
        res.status(200).json({"Department": deptData});
    }catch(err) {
        res.status(401).json({"err": err})
    }
});

//UPDATE Location endpoint
router.patch('/department/:id', verifyjwt, async (req,res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await Department.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no department under this id"})
    }
    try{
        const updateDept = await Department.updateOne({_id: req.params.id}, req.body);
        const updateResult = await Department.findById({_id: req.params.id});
        res.status(200).json({"Department": updateResult});
    } catch(err) {
        res.status(401).json({"err": err});
    }
})

//DELETE endpoint
router.delete('/departmentdel/:id', verifyjwt, async(req, res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await Department.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no department under this id"})
    }
    try{
        const deleteDept = await Department.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({"Status": "Deleted Succesfully"});
    }
    catch(err) {
        res.status(401).json({"err": err});
    }
})

module.exports = router;
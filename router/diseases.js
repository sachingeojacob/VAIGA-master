const router = require('express').Router();
const { Login } = require('../models/auth');
const {Disease} = require('../models/diseases');
const verifyjwt = require('./verifytoken');

// POST endpoint
router.post('/disease', async (req,res) => {
    // const isUser = await Login.findById({_id: req.user._id});
    // if(!isUser) {
    //     return res.status(400).json({ "error": 'There is no user exist!' });
    // }
    const nameExist = await Disease.findOne({name: req.body.name, category: req.body.category});
    if(nameExist) {
        res.status(400).json({"error": "Disease already exist!"});
    }
    const diseaseObj = new Disease ({
        name: req.body.name,
        category: req.body.category,
        remedies: req.body.remedies,
        youtubelinks: req.body.youtubelinks
    });
    try {
        const diseaseData = await diseaseObj.save();
        res.status(200).json({"Disease": diseaseData});
    } catch(err) {
        res.status(401).json({"err": err});
    }
});

//GET endpoint
router.get('/disease',verifyjwt, async (req, res) => {
    const diseaseData = await Disease.find({});
    try{
        res.status(200).json({"Disease": diseaseData});
    }catch(err) {
        res.status(401).json({"err": err})
    }
});

router.get('/diseaseget', async (req,res) => {
    const diseaseData = await Disease.find({}).populate('category');
    try{
        res.status(200).json({"Disease": diseaseData});
    }catch(err) {
        res.status(401).json({"err": err})
    }
})


//UPDATE Location endpoint
router.patch('/disease/:id', verifyjwt, async (req,res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await Disease.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no disease under this id"})
    }
    try{
        const updateDisease = await Disease.updateOne({_id: req.params.id}, req.body);
        const updateResult = await Disease.findById({_id: req.params.id});
        res.status(200).json({"Disease": updateResult});
    } catch(err) {
        res.status(401).json({"err": err});
    }
})

//DELETE endpoint
router.delete('/diseasedel/:id',verifyjwt, async(req, res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await Disease.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no disease under this id"})
    }
    try{
        const deleteDisease= await Disease.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({"Status": "Deleted Succesfully"});
    }
    catch(err) {
        res.status(401).json({"err": err});
    }
})

module.exports = router;
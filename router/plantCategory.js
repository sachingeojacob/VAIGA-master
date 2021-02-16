const router = require('express').Router();
const { Login } = require('../models/auth');
const {PlantCategory} = require('../models/plantCategory');
const verifyjwt = require('./verifytoken');
const cloudinary = require('cloudinary').v2;


var resulturl
// POST endpoint
router.post('/category', async (req,res) => {
    // const isUser = await Login.findById({_id: req.user._id});
    // if(!isUser) {
    //     return res.status(400).json({ "error": 'There is no user exist!' });
    // }
    const nameExist = await PlantCategory.findOne({name: req.body.name});
    if(nameExist) {
        res.status(400).json({"error": "Category already exist!"});
    }
    await cloudinary.uploader.upload(req.body.image, 
    function(error, result) {
        resulturl = result
    })
    const plantObj = new PlantCategory ({
        name: req.body.name,
        image: resulturl.secure_url
    })
    try {
        const plantData = await plantObj.save();
        res.status(200).json({"Plant Category": plantData});
    } catch(err) {
        res.status(401).json({"err": err});
    }
});

//GET endpoint
router.get('/category', async (req, res) => {
    const plantData = await PlantCategory.find({});
    try{
        res.status(200).json({"PlantCategory": plantData});
    }catch(err) {
        res.status(401).json({"err": err})
    }
});


//UPDATE Location endpoint
router.patch('/category/:id', async (req,res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await PlantCategory.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no category under this id"})
    }
    try{
        const updatePlant = await PlantCategory.updateOne({_id: req.params.id}, req.body);
        const updateResult = await PlantCategory.findById({_id: req.params.id});
        res.status(200).json({"Plant Catgeory": updateResult});
    } catch(err) {
        res.status(401).json({"err": err});
    }
})

//DELETE endpoint
router.delete('/categorydel/:id', async(req, res) => {
    const isUser = await Login.findById({_id: req.user._id});
    if(!isUser) {
        return res.status(400).json({ "error": 'There is no user exist!' });
    }
    const idExist = await PlantCategory.findById({_id:req.params.id});
    if(!idExist){
        return res.status(400).json({"error": "There is no category under this id"})
    }
    try{
        const deletePosition = await PlantCategory.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({"Status": "Deleted Succesfully"});
    }
    catch(err) {
        res.status(401).json({"err": err});
    }
})

module.exports = router;
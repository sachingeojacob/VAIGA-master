const router = require('express').Router();
const { Login } = require('../models/auth');
const { Disease } = require('../models/diseases');
const {Scanned} = require('../models/scanneddata');
const verifyjwt = require('./verifytoken');

// POST endpoint
router.post('/scanned', async (req,res) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day =  dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const scannedObj = new Scanned ({
        diseasename: req.body.diseasename,
        locality: req.body.locality,
        place: req.body.place,
        district: req.body.district,
        month: parseInt(month),
        day: parseInt(day),
        year: parseInt(year),
        lati: req.body.lati,
        logi: req.body.logi,
        pincode: req.body.pincode,
        image: req.body.image,
        deviceid: req.body.deviceid,
        category: req.body.category
    });
    try {
        const scannedData = await scannedObj.save();
        const data = await Disease.find({name: scannedObj.diseasename, category: scannedObj.category}).populate('category');
        res.status(200).json({"Scanned": scannedData, "items": data});
    } catch(err) {
        res.status(401).json({"err": err});
    }
});


//get
router.get('/scanned', async (req, res) => {
    const data = await Scanned.find({}).populate('category');
    try {
        res.status(200).json({"items": data})
    } catch(err) {
        res.status(401).json({"error": err})
    }
})

router.get('/scanfarmers/:id', async (req, res) => {
    const data = await Scanned.find({deviceid: req.params.id}).sort("-1");
    try{
        res.status(200).json({"data": data})
    } catch(err) {
        res.status(401).json({"error": err})
    }
})

module.exports = router;

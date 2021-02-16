const express = require('express');
const axios = require('axios');
const { request } = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {root} = require('../uploads/rootdir');

var pathtofile;
var filenamez;

var storage = multer.diskStorage({
    destination: function(req,file,callback) {
        callback(null,"uploads");
    },
    filename: function(req,file,callback) {
        callback(null,file.fieldname+file.originalname);
        filenamez = file.originalname;
        pathtofile = root+"/catImage"+filenamez;
    }
});

var upload = multer({
    storage: storage
}).array("catImage", 3);


router.get('/', async(req,res)=>{

    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }; 
    await axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('welcomePage',{user: resp.data.user})  
    }) 
    
});

router.get('/diseases', async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }; 
    await axios.get('http://localhost:4000/api/v1/diseaseget', config).then(respo => {
        axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
            res.render('diseases', {resp: respo.data.Disease, user: resp.data.user})
        }) 
        
    })
});

router.get('/addCategory', async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
   await axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
            res.render('addCategory', {resp: resp.data.Disease, user: resp.data.user})
        }) 
}).post('/addCategory',async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    upload (req,res, async (err)=>{
        if(err) {
            console.log("Failed");
        }
        let data = {
            name: req.body.catName,
            image: pathtofile
        }
        await axios.post('http://localhost:4000/api/v1/category', data, config).then(resp => {
                res.redirect('/addCategory')
            })

        fs.unlink(pathtofile, function(err) {
            if(err) {
                throw err
            }else {
                console.log("Success");
            }
        })
    })
});

router.get('/addDiseases', async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get('http://localhost:4000/api/v1/category', config).then(respo => {
        axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
            res.render('addDiseases', {resp: respo.data.PlantCategory, user: resp.data.user})
        }) 
        ;
    })
}).post('/addDiseases',  async(req,res) => {
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    let data = {
        name: req.body.dname,
        category: req.body.category,
        remedies: req.body.remedies,
        youtubelinks: req.body.youtubelinks
    }

    await axios.post('http://localhost:4000/api/v1/disease', data, config).then(resp => {
        res.redirect('/addDiseases')
    });
})

router.get('/concerns',async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('concerns', { user: resp.data.user})
    }) 
});

router.get('/officer', async (req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('officer', { user: resp.data.user})
    }) 
});

router.get('/addDepartment',async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('addDepartment', { user: resp.data.user})
    }) 
}).post('/addDepartment',async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    let data = {
        name: req.body.deptName,
    }

    await axios.post('http://localhost:4000/api/v1/department', data, config).then(resp => {
        res.redirect('/addDepartment')
    });
});

router.get('/addPosition',async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get('http://localhost:4000/api/v1/department', config).then(respo => {
         axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('addPosition', {resp: respo.data.Department, user: resp.data.user});
    })    
    })
}).post('/addPosition', async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    let data = {
        name: req.body.posName,
        departmentID: req.body.departmentId
    }

    await axios.post('http://localhost:4000/api/v1/position', data, config).then(resp => {
        res.redirect('/addPosition')
    });
});

router.get('/addOfficers',async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get('http://localhost:4000/api/v1/department', config).then(respo => {
        axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('addOfficer', { resp: respo.data.Department, user: resp.data.user})
    }) 
    })
}).post('/addOfficer', async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    upload (req,res, async (err)=>{
        if(err) {
            console.log("Failed");
        }
        let data = {
            username: req.body.username,
            password: req.body.password,
            roleID: 2,
            name: req.body.officerName,
            email: req.body.email,
            department: req.body.department,
            position: req.body.position,
            mobile: req.body.mobile,
            image: pathtofile,
        }
        await axios.post('http://localhost:4000/api/v1/auth', data, config).then(resp => {
            res.redirect('/addOfficer')
        });

        fs.unlink(pathtofile, function(err) {
            if(err) {
                throw err
            }else {
                console.log("Success");
            }
        })
    })
    

   
});

router.get('/analytic',async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('analytic', { user: resp.data.user})
    }) 
});

router.get('/analyticMonths', async(req,res)=>{
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    await axios.get(`http://localhost:4000/api/v1/getuser/${req.session.userid}`, config).then(resp => {
        res.render('viewByMonths', { user: resp.data.user})
    }) 
});

router.get('/login', async (req,res)=>{
    res.render('login');
}).post('/login', async (req,res)=>{ 
    let config =  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    let data = {
        username: req.body.username,
        password: req.body.password,
    }

    await axios.post('http://localhost:4000/api/v1/login', data, config).then(resp => {
        if(resp.data.roleid == 1) {
            req.session.token = resp.data.success;
            req.session.userid = resp.data.userid;
            res.redirect('/')
        } else if(resp.data.roleid == 2) {
            console.log("officers");
        }
    });
});

module.exports = router;
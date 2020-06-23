const jwt = require('jsonwebtoken');
const Subscribers = require('../models/subscriberModel');//importing routingModel from model//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.user_create = function (req, res) {

    console.log(req.body);
    let address=JSON.stringify(req.body.address);
    let company=JSON.stringify(req.body.company);
    let user = new Subscribers(
        {
            name: req.body.name,
            uname: req.body.uname,
            email: req.body.email,
            password: req.body.pswd,
            phone:req.body.phone,
            website:req.body.website,
           address:req.body.address,
            company:req.body.company
         }
    );
    
    // user.push({'company':req.body.company});
    // user.markModified(address);
    // user.markModified(company);
    console.log("user =="+user);

    user.save(function (err, user) {
        if (err) {
            throw err;
        }
        let payload={subject:user._id}
        let token = jwt.sign(payload,'secretKey')
        res.status(200).send({token});
        console.log("heyyyyyyyy this is from token=  "+token);
    })
};

exports.user_update = function (req, res) {
    Subscribers.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        if (err) throw err;
        res.status(200).send(user);
    });
}

exports.user_delete = function (req, res) {
    Subscribers.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return next(err);
        res.status(200).send(user);
    })
};

exports.user_alldetails = function (req, res) {
    Subscribers.find({}, function (err, user) {
        if (err) throw err;
        res.status(200).send(user);
    })
};

exports.user_login = function (req, res) {
    let userData = req.body;
    console.log(userData);
    let result={
        user: Object,
        message:String,
        status: Number,
         token:String
    }
    //let status,message;
    Subscribers.findOne({ uname: userData.username }, (error, user) => {
        if (error) {
            message="Server Error";
            status=500;
            console.log(error);
        } else {
            if (!user) {
                 message="invaild username";
                status=401;
            } else {
                if (user.password !== userData.password) {
                    message="invaild password";
                status=402;
                }
                else {
                    message="login succcessful";
                    status=200;
                    result.user=user;
                    let payload={subject:user._id}
            let token=jwt.sign(payload,'secretKey')
                    result.token=token;
                    }
                   

            }

            result.message=message;
            result.status=status;
            
            res.send(result);
            console.log("heyyyyyyyy this is from login token=  "+result.token);
        }
    })
    
};
exports.check_username = function (req, res) {
    let userData = req.body;
    console.log(userData);
    let result={
        
message:String,
        status: Number

    }
    //let status,message;
    Subscribers.findOne({ UserName: userData.username }, (error, user) => {
        if (error) {
            message="Server Error";
            status=500;
            console.log(error);
        } else {
            if (!user) {
                 message="username not exists";
                status=401;
            } 
                else {
                    
                    message="username exists";
                    status=200;
                    
                    }
                
            result.message=message;
            result.status=status;
            res.status(200).send(result);
        }
    })
    
};







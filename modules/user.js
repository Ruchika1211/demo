var Users =require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');




exports.googleSignup=(req,res)=>{


    //console.log(req.body)
    Users.find({'email':req.body.email},(err,user)=>{

        if(err)
        {
            return res.status(500).json({
                message:'An error has occured',
                err:err
            });
        }

        if(user)
        {
           return res.status(200).json({
                message:'User already exist',
              
            })
        }

        var userData= new Users({
            username:req.body.name,
            uid:req.body.uid,
            email:req.body.email,
            imageUrl:req.body.image
        });
      
        userData.save((err,data)=>{
          
            if(err)
            {
                return res.status(500).json({
                    message:'An error has occured',
                    err:err
                });
            }
        
            res.status(200).json({
                message:'SignUp suceesss',
                data:data
            })
    
        });

    })
   
}

exports.Signup=(req,res)=>{
    
        Users.findOne({'email':req.body.email},(err,user)=>{
    
            if(err)
            {
                return res.status(500).json({
                    message:'An error has occured',
                    err:err
                });
            }

            console.log(user);
    
            if(user)
            {
               return res.status(200).json({
                    message:'User already exist',
                  
                })
            }
    
            var userData= new Users({
                username:req.body.username,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                email:req.body.email,
             
            });
          
            userData.save((err,data)=>{
              
                if(err)
                {
                    return res.status(500).json({
                        message:'An error has occured',
                        err:err
                    });
                }
            
                res.status(200).json({
                    message:'SignUp suceesss',
                    data:data
                })
        
            });
    
        })
}



exports.Signin = (req, res) => {

    Users.findOne({
        email: req.body.email
    },(err, user) => {
       console.log(err);
       console.log(user);

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: "true",
                detail: err
            });
        }

        console.log('user1');
        if (!user) {
            return res.status(200).json({
                title: 'user not found',
                error: "true",
                detail: "invalid Login"
            });
        }
        console.log('user2');
        var data = {
            _id: user._id,
            email: user.email,

        }
        console.log('user3');
        var token = jwt.sign({
            user: data
        },process.env.secret, {
            expiresIn: 7200
        });

     
        console.log('user4');
       if(user.uid)
       {
           if(!(user.uid == req.body.uid))
           {
            return res.status(200).json({
                title: 'User not found',
                error: "false"
            });
           }
           else{
                  res.status(200).json({
                        title: 'user found',
                        error: "false",
                        token: token,
                        user: user
                    });
           }
       }
       else{
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log("err");
            console.log("user");
            return res.status(200).json({
                title: 'Invalid password',
                error: "true",
                detail: 'password does not match'

            });
        }

        res.status(200).json({
            title: 'user found',
            error: "false",
            token: token,
            user: user
        });





       }

     
    });

}
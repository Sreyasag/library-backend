const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


exports.signUp = async (req,res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
         
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
        
        //prevent password sending back 
        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            token:token,
            data: newUser
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.logIn = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user= await User.findOne({email:email}).select('+password'); //bcz password is set select:false in schema
         
        const isCorrectPassword = await bcrypt.compare(password,user.password);

        if(!user || !isCorrectPassword){
            throw new Error('Incorrect username or password');  
        } 
        token = jwt.sign (
            {id: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn:'1d'}
        );
        
        user.password= undefined;
        
        res.status(200).json({
            status:'success',
            user,
            token
        })
    } catch (error) {
        res.status(401).json({
            status:'fail',
            message:error.message
        })
    }
}

exports.getUser = async (req,res) => {
    try {
        const user =await User.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.updateUser = async (req,res) => {
    try {
        const updatedUser =await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        });

        res.status(200).json({
            status: 'success',
            data: updatedUser
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.deleteUser = async (req,res) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(204).json({
        status:'success',
        data:null
      })
    } catch (error) {
      res.status(404).json({
        status:'fail',
        message: error.message
      })
    }
  }

  //protecting routes

  exports.protect = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            throw new Error('Not authorized')
        }
        jwt.verify(token, process.env.JWT_SECRET, (err,tokenData)=>{
            if(err)  throw err;  //check 
            req.user = tokenData.id;
            next();
        })
        
    } catch (error) {
        res.status(401).json({
            status:'fail',
            message:error.message
        })
    }
  }
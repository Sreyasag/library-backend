const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength:[8, 'Password must have atleast 8 characters.'],
        select:false
    },
})

userSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next();   //if password is not modified, it will exit out of this pre middleware immediately

    this.password = await bcrypt.hash(this.password,12);
    next();
})


const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: True
    },
    email: {
        type: String,
        required: True
    },
    password: {
        type: String,
        required: True
    },
    date: {
        type:Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
/* 
We want to export this 
we'll just put this in a variable 

we want to create a model from our schema 
so we pass in the model name which is 'User' && UserSchema
then export it
*/
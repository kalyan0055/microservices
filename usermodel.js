'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var users = new Schema({
        firstName:{
        type:String,
        require:true,
        },
        lastName :{
            type:String,
             
        },
        email :{
            type:String,
                    
        }
    })
mongoose.model('users',users)
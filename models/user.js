var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    username: {
      type: String,
     required: true
       },

    uid: {
      type: String,
      required: false
    },

    
    password: {
      type: String,
       required: false
     },

    email: {
      type: String,
      required: true,
       unique: true
     },

    contact: {
       type: String,
       required: false,
       default:""
       },

    dob: {
       type: String,
       required: false,
         default:""
       },
     password: {
          type: String,
          required: false,
          },

     imageUrl: {
          type: String,
          required: false,
          default:"noImage"
          },
   
   address: {
          city:{
            type: String,
            required: false,
              default:""
          },
          postalCode:{
            type: String,
            required: false,
              default:""
          },
          addressLine:{
            type:String,
            required: false,
              default:""
          }
        },
 
    
    resetPasswordToken: String,
     lastseen: Date,
    resetPasswordExpires: Date,
   
},
  {
    timestamps: true
  });

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Users', schema);

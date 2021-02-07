const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: {type:String},
    rut: {type:String},
    email: {type:String},
    password: {type:String}
    
},{
    timestamps: true
});

module.exports = model('user', userSchema);
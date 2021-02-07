const { Schema, model } = require('mongoose');

const transSchema = new Schema({
        user_id:{
             type: String 
        },
        tipo: {
            type: String,
            enum: ["Giro", "Abono", "Transferencia"],
        },
        valor: {
            type: Number,
            default:0
        },
        rut_destino:{
            type: String
        },
        Banco:{
            type: String,
            enum: ["Banco Santander", "Banco de chile", "Banco Ripley"], 
        },
        tipo_cuenta:{
            type: String,
            enum: ["Cuenta corriente", "Cuenta vista", "Cuenta de ahorro"], 
        },
        Numero_cuenta:{
            type: String 
       }
       

});

module.exports = model('transactions', transSchema);
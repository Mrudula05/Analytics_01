const mongoose = require('mongoose');

const EnergyMeterSchema = mongoose.Schema({

  UTC:String,
  Date:String,
  Time:String,
  Box_Id:String,
  Active_Power:String
  
},
{
	__v: false
});

module.exports = mongoose.model('energymeter', EnergyMeterSchema);
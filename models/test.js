const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
	
  
 timestamp: { type: Date, default: Date },
  UTC:String,
  Date:String,
  Time:String,
  BoardId : String,
  temp: Number,
  humidity: Number,
  lumVal: Number,
  bavol:Number,
  PIR:Number,
  Reserve:Number
},
{
	__v: false
});

module.exports = mongoose.model('test', TestSchema);
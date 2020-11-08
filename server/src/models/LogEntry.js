const mongoose = require('mongoose');

const { Schema } = mongoose;

/*
* Title - Text
* Description - Text
* Comments - Text
* Rating - scale of 1 - 10
* Image - Text - URL
* Latitude - Number
* Longitude - number
* Created At - DateTime
* Edited At - DateTime
*/

const requiredNumber = {
  type: Number,
  required: true,
};

const schemaOptions = {
  timestamps: true,
};

const logEntrySchema = new Schema({
  title: String,
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  image: String,
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    type: Date,
    required: true,
  },
},
schemaOptions);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = LogEntry;

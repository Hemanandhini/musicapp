const mongoose = require('mongoose');
// Define schema

const dataSchema = new mongoose.Schema({
    userId: Number,
    id: Number,
    title: String
  });
  
  // Define model
  const DataModel = mongoose.model('AlbumData', dataSchema);
  
  module.exports = DataModel;
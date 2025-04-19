import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  user: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  longUrl: {
    type: String,
    required: true
  },
  alias: {
    type: String,
    required: true,
    unique: true
  },
  expireDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    default: 0
  },
  clickData: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    ipAddress: String,
    browser: String,
    device: String,
    location: String
  }]
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

export default Url;
// import mongoose
const mongoose = require('mongoose');

// create model schema object
// Blog Model Definition
const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: Array ,
    dislikes: { type: Number, default: 0 },
    dislikedBy: Array ,
    
  });
  blogSchema.set('toJSON', {
    transform: function (doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
    virtuals: true,
    versionKey:false
  }); 
  
const BlogModel=mongoose.model('blogs', blogSchema);

// Export Module/Schema
module.exports = BlogModel;
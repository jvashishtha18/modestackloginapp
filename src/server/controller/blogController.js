const Blogs = require('../models/blogModel.js');//importing routingModel from model//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


      //  CREATE NEW BLOG
exports.new_blog = function (req, res){
  
      // Check if blog title was provided
      if (!req.body.title) {
        res.json({ success: false, message: 'Blog title is required.' }); // Return error message
      } else {
        // Check if blog body was provided
        if (!req.body.body) {
          res.json({ success: false, message: 'Blog body is required.' }); // Return error message
        } else {
          // Check if blog's creator was provided
          if (!req.body.createdBy) {
            res.json({ success: false, message: 'Blog creator is required.' }); // Return error
          } else {
            // Create the blog object for insertion into database
            const blog = new Blogs({
              title: req.body.title, // Title field
              body : req.body.body, // Body field
              createdBy: req.body.createdBy // CreatedBy field
            });
            // Save blog into database
            blog.save((err) => {
              // Check if error
              if (err) {
                // Check if error is a validation error
                if (err.errors) {
                  // Check if validation error is in the title field
                  if (err.errors.title) {
                    res.json({ success: false, message: err.errors.title.message+'title' }); // Return error message
                  } else {
                    // Check if validation error is in the body field
                    if (err.errors.body) {
                      res.json({ success: false, message: err.errors.body.message+'body' }); // Return error message
                    } else {
                      res.json({ success: false, message: err +'gen error'}); // Return general error message
                    }
                  }
                } else {
                  res.json({ success: false, message: err+'gen error 2' }); // Return general error message
                }
              } else {
                res.json({ success: true, message: 'Blog saved!' }); // Return success message
              }
            });
          }
        }
      }
    };
  

      //  GET ALL BLOGS
   
    exports.all_blog = function (req, res){
      // Search database for all blog posts
      Blogs.find({}, (err, blogs) => {
        // Check if error was found or not
        if (err) {
          res.json({ success: false, message: err }); // Return error message
        } else {
          // Check if blogs were found in database
          if (!blogs) {
            res.json({ success: false, message: 'No blogs found.' }); // Return error of no blogs found
          } else {
            res.json({ success: true, blogs: blogs }); // Return success and blogs array
          }
        }
      }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    };
  
   
      //  GET SINGLE BLOG
    
    exports.single_blog = function (req, res){
      // Check if id is present in parameters
      if (!req.params.id) {
        res.json({ success: false, message: 'No blog ID was provided.' }); // Return error message
      } else {
        // Check if the blog id is found in database
        Blogs.findOne({ _id: req.params.id }, (err, blog) => {
          // Check if the id is a valid ID
          if (err) {
            res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
          } else {
            // Check if blog was found by id
            if (!blog) {
              res.json({ success: false, message: 'Blog not found.' }); // Return error message
            } else {
              res.json({ success: true, blog: blog });
            }
          }
        });
      }
    };
  
    
      //  UPDATE BLOG POST
    
    exports.update_blog = function (req, res){
      // Check if id was provided
      if (!req.body.id) {
        res.json({ success: false, message: 'No blog id provided' }); // Return error message
      } else {
        // Check if id exists in database
        Blogs.findOne({ _id: req.body.id }, (err, blog) => {
          // Check if id is a valid ID
          if (err) {
            res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
          } else {
            // Check if id was found in the database
            if (!blog) {
              res.json({ success: false, message: 'Blog id was not found.' }); // Return error message
            } else {
             blog.title = req.body.title; // Save latest blog title
             blog.body = req.body.body; // Save latest body
             blog.save((err) => {
               if (err) {
                 if (err.errors) {
                   res.json({ success: false, message: 'Please ensure form is filled out properly' });
                 } else {
                   res.json({ success: false, message: err }); // Return error message
                 }
               } else {
                 res.json({ success: true, message: 'Blog Updated!' }); // Return success message
               }
             });
           }
         }
        });
      }
    };
  
  
      //  DELETE BLOG POST
    
    exports.delete_blog = function (req, res){
      // Check if ID was provided in parameters
      if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
      } else {
        // Check if id is found in database
        Blogs.findOne({ _id: req.params.id }, (err, blog) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: 'Invalid id' }); // Return error message
          } else {
            // Check if blog was found in database
            if (!blog) {
              res.json({ success: false, messasge: 'Blog was not found' }); // Return error message
            } else {
              blog.remove((err) => {
                if (err) {
                  res.json({ success: false, message: err }); // Return error message
                } else {
                  res.json({ success: true, message: 'Blog deleted!' }); // Return success message
                }
              });
            }
          }
        });
      }
    };

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const blog_controller = require('../controller/blogController');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', blog_controller.test);
router.get('/allBlogs', blog_controller.all_blog);
router.get('/singleBlog/:id',blog_controller.single_blog)
router.post('/newBlog', blog_controller.new_blog);
router.put('/updateBlog', blog_controller.update_blog);
router.delete('/deleteBlog/:id', blog_controller.delete_blog);

module.exports = router;
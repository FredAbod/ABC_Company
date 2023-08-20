import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import { blogSchema } from "../../../utils/validation/validation.js";
import Blog from "../models/blogs.models.js";
import User from "../models/user.model.js";


export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const  authorId  = req.user.userId;
    const { error } = blogSchema.validate(req.body);
    if (error) {
      return errorResMsg(res, 404, error.message);
    }

    // Create a new blog post
    const newBlogPost = new Blog({
      title,
      content,
      author: authorId 
    });

    // Save the blog post to the database
    const savedBlogPost = await newBlogPost.save();
return successResMsg(res, 200, {data: { blog: savedBlogPost}, message: "Blog Created Successfully"});
  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
};

// Endpoint to update a blog post
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      throw new Error("Both title and content cannot be empty.");
    }

    const blogId = req.params.blogId;

    const updatedBlog = await Blog.findById(blogId);

    if (!updatedBlog) {
      return errorResMsg(res, 404, "Blog not found");
    }

    // Check if the logged-in user's ID matches the author's ID in the blog
    if (String(updatedBlog.author) !== req.user.userId) {
      return errorResMsg(res, 403, "You are not authorized to update this blog post.");
    }

    // Only update the fields if they are provided in the request
    if (title) {
      updatedBlog.title = title;
    }
    if (content) {
      updatedBlog.content = content;
    }

    const savedUpdatedBlog = await updatedBlog.save();

    return successResMsg(res, 200, { data: { blog: savedUpdatedBlog }, message: "Blog Updated Successfully" });
  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
};


// Endpoint to delete a blog post
export const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;

    const deletedBlog = await Blog.findById(blogId);

    if (!deletedBlog) {
      return errorResMsg(res, 404, "Blog not found");
    }

    // Check if the logged-in user's ID matches the author's ID in the blog
    if (String(deletedBlog.author) !== req.user.userId) {
      return errorResMsg(res, 403, "You are not authorized to delete this blog post.");
    }

    const deletedResult = await Blog.findByIdAndDelete(blogId);

    if (!deletedResult) {
      return errorResMsg(res, 500, "An error occurred while deleting the blog post.");
    }

    return successResMsg(res, 200, { message: "Blog Deleted Successfully" });
  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
};


// Endpoint to retrieve all blog posts
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    const blogCount = blogs.length; // Count the number of blogs

    return successResMsg(res, 200, { data: { blogs, count: blogCount }, message: "Blogs Retrieved Successfully" });
  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
};


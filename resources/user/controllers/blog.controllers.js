import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import { blogSchema } from "../../../utils/validation/validation.js";
import Blog from "../models/blogs.models.js";
import User from "../models/user.model.js";


export const createBlog = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;
    const { error } = blogSchema.validate(req.body);
    if (error) {
      return errorResMsg(res, 404, error.message);
    }

    // Create a new blog post
    const newBlogPost = new Blog({
      title,
      content,
      // author: authorId // Assuming you have the author's ID from authentication
    });

    // Save the blog post to the database
    const savedBlogPost = await newBlogPost.save();
return successResMsg(res, 200, {data: { blog: savedBlogPost}, message: "Blog Created Successfully"});
  } catch (error) {
    return errorResMsg(res, 500, error.message);
  }
};

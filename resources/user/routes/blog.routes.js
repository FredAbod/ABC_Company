import express from "express";
import { isAuthenticated } from "../../../middleware/isAuthenticated.js";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../controllers/blog.controllers.js";

const router = express.Router();

router.get('/allblog', getAllBlogs);
router.post('/create',isAuthenticated, createBlog);
router.put('/update/:blogId',isAuthenticated, updateBlog);
router.delete('/delete/:blogId',isAuthenticated, deleteBlog);

export default router;
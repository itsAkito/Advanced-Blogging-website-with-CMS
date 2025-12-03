import express from 'express'
import { adminLogin, approvedCommentById, getAllBlogsAdmin, getDashboard } from '../controllers/adminlogin.js';
import { getAllComments,deleteCommentById } from '../controllers/adminlogin.js';
import auth from '../middlewares/auth.js';

const adminRouter=express.Router();

adminRouter.post('/login',adminLogin);
adminRouter.get('/comment', auth,getAllComments)
adminRouter.get('/blogs',auth,getAllBlogsAdmin)
adminRouter.post('/delete-comment',auth,deleteCommentById)
adminRouter.post('/approve-comment',auth,approvedCommentById)
adminRouter.get('/dashboard',auth,getDashboard)
export default adminRouter;
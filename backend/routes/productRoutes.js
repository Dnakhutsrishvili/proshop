import express from "express";
const router=express.Router();
import { createPRoducts, getProductById,getPRoducts, updatePruducts } from "../controllers/productController.js";
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getPRoducts);
router.route('/').post(protect,admin,createPRoducts);
router.route('/:id').get(getProductById).put(protect,admin,updatePruducts);


export default router;
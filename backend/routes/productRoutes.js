import express from "express";
const router=express.Router();
import { getProductById,getPRoducts } from "../controllers/productController.js";

router.route('/').get(getPRoducts);
router.route('/:id').get(getProductById);


export default router;
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc fetch all products
// @route GET/api/products
// @access Public
const getPRoducts=asyncHandler(async(req,res)=>{
    const product=await Product.find({})
    res.json(product)
});

// @desc fetch a product
// @route GET/api/products/:id
// @access Public
const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        return  res.json(product)
    }
  res.status(404)
  throw new Error('Product not found');
});

// @desc create product
// @route POST/api/products
// @access private/admin
const createPRoducts=asyncHandler(async(req,res)=>{
   const product= new Product({
    name:'sample name',
    price:0,
    user:req.user._id,
    image:'sample/sa,ple.jpg',
    brand:'sample brand',
    category:'sample category',
    countInStock:0,
    numReviews:0,
    description:'sample desctiprion'
   })

   const createdProduct=await product.save();
   res.status(201).json(createdProduct)
});

// @desc update products
// @route PUT/api/products/:id
// @access private
const updatePruducts=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body;
    const product=await Product.findById(req.body._id);
    if(product){
        product.name=name;
        product.price=price;
        product.description=description;
        product.image=image;
        product.brand=brand;
        product.category=category;
        product.countInStock=countInStock;

        const updatedProduct=await product.save();

        res.json(updatedProduct)
    }else{
        res.status(404);
        throw new Error('resourse not found');
    }

});
export {getPRoducts,getProductById,createPRoducts,updatePruducts}; 
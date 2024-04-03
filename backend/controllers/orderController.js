import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc create new order
// @route POST/api/post
// @access private
const addOrderItems=asyncHandler(async(req,res)=>{
    const { orderItems,
        shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            userId
}=req.body;

    if(orderItems&&orderItems.length===0){
        res.status(400);
        throw new Error('No order Items')
    }else{
        const order= new Order({
            orderItems:orderItems.map((x)=>({
                ...x,
                product:x._id,
                _id:undefined
            })),
            users:userId,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
      const createdOrder= await  order.save();

      res.status(201).json(createdOrder)
    }
});

// @desc get logged in suers order
// @route GET/api/orders/myorders
// @access private
const getMyOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id})
    res.status(200).json(orders)
});

// @desc get order by id
// @route GET/api/orders/:id
// @access private
const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params._id).populate('user' ,'name email');

    if(order){
        res.status(200).json(order);
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
});

// @desc update order to paid
// @route GET /api/orders/:id/pay
// @access private
const updateOrderToPaid=asyncHandler(async(req,res)=>{
    res.send('update order to paid')
});

// @desc update order to delivered
// @route GET /api/orders/:id/deliver
// @access private/admin
const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    res.send('update order to delivered')
});

// @desc update get all order
// @route GET /api/orders
// @access private/admin
const getOrders=asyncHandler(async(req,res)=>{
    res.send('get all orders')
});

export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}